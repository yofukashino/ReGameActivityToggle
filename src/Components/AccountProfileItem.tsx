import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import UserSettingStore from "../lib/UserSettingStore";
import ContextMenu from "./ContextMenu";
import Icons from "./Icons";
import Utils from "../lib/utils";
import Types from "../types";

export default ({ ProfileItem }: { ProfileItem: Types.ProfileItem }): React.ReactElement | null => {
  if (!SettingValues.get("statusPicker", defaultSettings.statusPicker)) return null;

  const enabled = UserSettingStore.useSetting("status", "showCurrentGame");
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

  return (
    <div>
      <ProfileItem
        label={`${enabled ? "Hide" : "Show"} Game Activity`}
        id="game-activity"
        icon={() => (enabled ? DisabledIcon : Icon)}
        onClick={() => Utils.toggleGameActivity(enabled)}
        renderSubmenu={({ closePopout }) => <ContextMenu onClose={closePopout} />}
      />
      <div id="profileDivider" />
    </div>
  );
};
