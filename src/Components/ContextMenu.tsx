import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "..";
import { defaultSettings, Sounds } from "../lib/consts";
import { ConnectedAccountsStore, ConnectedAccountsUtils, SoundUtils } from "../lib/requiredModules";
import Icons from "./Icons";
const { MenuCheckboxItem, ContextMenu: Menu, MenuSeparator, MenuItem } = ContextMenu;

export default (props) => {
  const ConnectedAccounts = ConnectedAccountsStore.getAccounts() as Array<{
    type: string;
    id: string;
    name: string;
    showActivity: boolean;
  }>;
  const SpotifyAccounts = ConnectedAccounts.filter((a) => a.type === "spotify").map((a) => {
    const [value, onChange] = React.useState(a.showActivity);
    return (
      <MenuCheckboxItem
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
              (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyDisable ?? true)) ||
              (a.showActivity &&
                (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyEnable ?? true)))
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
  return (
    <Menu {...props} navId="yofukashino">
      <MenuItem
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
          if (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyToogle ?? true) {
            SoundUtils.playSound(Sounds.SpotifyToogle, 0.5);
          }
        }}
      />
      <MenuSeparator />
      {SpotifyAccounts.length ? (
        SpotifyAccounts
      ) : (
        <MenuItem
          label="No Accounts"
          subtext="You may connect a spotify account from connections tab in settings first."
          id="no-accounts"
          showIconFirst={true}
          icon={() => <Icons.noLive height="16" width="16" />}
        />
      )}
    </Menu>
  );
};
