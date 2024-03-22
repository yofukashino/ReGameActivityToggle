import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { PluginInjectorUtils, SettingValues } from "../index";
import { defaultSettings, Sounds } from "../lib/consts";
import UserSettingStore from "../lib/UserSettingStore";
import Icons from "../Components/Icons";
import Utils from "../lib/utils";
import Types from "../types";
import { ConnectedAccountsStore, ConnectedAccountsUtils, SoundUtils } from "../lib/requiredModules";

export default (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.Account,
    (_data, { children }: Types.MenuProps) => {
      if (!SettingValues.get("statusPicker", defaultSettings.statusPicker)) return;
      const ConnectedAccounts = ConnectedAccountsStore.getAccounts() as Array<{
        type: string;
        id: string;
        name: string;
        showActivity: boolean;
      }>;
      const SpotifyAccounts = ConnectedAccounts.filter((a) => a.type === "spotify").map((a) => {
        const [value, onChange] = React.useState(a.showActivity);
        return (
          <ContextMenu.MenuCheckboxItem
            id={a.id}
            label={a.name}
            checked={value}
            action={(e) => {
              onChange((prev) => !prev);
              a.showActivity = !a.showActivity;
              ConnectedAccountsUtils.setShowActivity("spotify", a.id, a.showActivity);
              if (
                e &&
                ((!a.showActivity &&
                  (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyDisable ??
                    true)) ||
                  (a.showActivity &&
                    (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyEnable ??
                      true)))
              ) {
                SoundUtils.playSound(
                  a.showActivity ? Sounds.SpotifyEnable : Sounds.SpotifyDisable,
                  0.5,
                );
              }
            }}
          />
        );
      });
      const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
      const Icon = (
        <Icons.controller
          width="16"
          height="16"
          style={{
            marginLeft: "-2px",
          }}
        />
      );
      const DisabledIcon = (
        <Icons.controller
          width="16"
          height="16"
          style={{
            marginLeft: "-2px",
          }}>
          <polygon
            style={{
              fill: "#a61616",
            }}
            points="22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 "
          />
        </Icons.controller>
      );
      const switchAccount = children.find((c) => c?.props?.children?.key === "switch-account");
      if (!children.find((c) => c?.props?.className === "yofukashuno"))
        children.splice(
          children.indexOf(switchAccount),
          0,
          <ContextMenu.MenuGroup className="yofukashuno" children={[]} />,
        );
      const section = children.find((c) => c?.props?.className === "yofukashuno");
      section.props.children = section.props.children.filter(
        (m) => m?.props?.id !== "game-activity",
      );
      if (!section.props.children.find((m) => m?.props?.id === "game-activity"))
        section.props.children.push(
          <ContextMenu.MenuItem
            label={`${enabled ? "Hide" : "Show"} Game Activity`}
            id="game-activity"
            subtext={`${
              enabled ? "Disable" : "Enable"
            } displaying currently running game in your activity status.`}
            keepItemStyles={true}
            action={() => {
              return Utils.toggleGameActivity(enabled);
            }}
            showIconFirst={true}
            icon={() => (enabled ? DisabledIcon : Icon)}>
            <ContextMenu.MenuItem
              label="Spotify Accounts"
              subtext="Here you may toggle which account is allowed to show song playing as activiy on your account"
              id="spotify-accounts"
              showIconFirst={true}
              icon={() => <Icons.music height="16" width="16" />}
              action={() => {
                for (const {
                  props: { action },
                } of SpotifyAccounts)
                  action(false);
                if (
                  SettingValues.get("playAudio", defaultSettings.playAudio).spotifyToogle ??
                  true
                ) {
                  SoundUtils.playSound(Sounds.SpotifyToogle, 0.5);
                }
              }}
            />
            <ContextMenu.MenuSeparator />
            {SpotifyAccounts.length ? (
              SpotifyAccounts
            ) : (
              <ContextMenu.MenuItem
                label="No Accounts"
                subtext="You may connect a spotify account from connections tab in settings first."
                id="no-accounts"
                showIconFirst={true}
                icon={() => <Icons.noLive height="16" width="16" />}
              />
            )}
          </ContextMenu.MenuItem>,
        );
    },
  );
};
