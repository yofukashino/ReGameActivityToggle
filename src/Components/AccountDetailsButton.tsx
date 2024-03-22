import { plugins } from "replugged";
import { contextMenu as ContextMenuApi, React } from "replugged/common";
import { SettingValues } from "../index";
import { PanelButton } from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
import UserSettingStore from "../lib/UserSettingStore";
import Icons from "../Components/Icons";
import SpotifyAccountsContextMenu from "./ContextMenu";
import Utils from "../lib/utils";

export const _addPanelButton = (): React.ReactElement | null => {
  if (
    !SettingValues.get("userPanel", defaultSettings.userPanel) ||
    plugins.getDisabled().includes("dev.tharki.ReGameActivityToggle")
  )
    return null;
  const [enabled, setEnabled] = React.useState(
    UserSettingStore.getSetting("status", "showCurrentGame"),
  );
  React.useEffect(() => {
    setEnabled(UserSettingStore.getSetting("status", "showCurrentGame"));
  }, [UserSettingStore.getSetting("status", "showCurrentGame")]);
  const Icon = <Icons.controller width="20" height="20" />;
  const DisabledIcon = (
    <Icons.controller width="20" height="20">
      <polygon
        style={{
          fill: "#a61616",
        }}
        points="22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 "
      />
    </Icons.controller>
  );

  return (
    <PanelButton
      onContextMenu={(event) =>
        ContextMenuApi.open(event, (props) => (
          <SpotifyAccountsContextMenu {...props} onClose={ContextMenuApi.close} />
        ))
      }
      icon={() => (enabled ? Icon : DisabledIcon)}
      tooltipText={`${enabled ? "Hide" : "Show"} Game Activity`}
      onClick={() => {
        Utils.toggleGameActivity(enabled);
      }}
    />
  );
};
