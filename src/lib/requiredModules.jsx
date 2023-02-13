import { webpack } from "replugged";
import * as Utils from "./utils.jsx";
export const WindowInfoStore = webpack.getByProps("isFocused", "isElementFullScreen");

export const KeybindUtils = {
  module: webpack.getBySource("numpad plus"),
  get toCombo() {
    return webpack.getFunctionBySource(this.module, "numpad plus");
  },
  get toEvent() {
    return webpack.getFunctionBySource(this.module, /(?=.*keyCode)(?=.*BROWSER)/);
  },
};

export const SoundUtils = {
  module: webpack.getBySource(/function.*\.disableSounds.*\.getSoundpack\(\).*play\(\).*return/),
  get createSound() {
    return webpack.getFunctionBySource(this.module, "return new");
  },
  get createSoundpackSound() {
    return webpack.getFunctionBySource(this.module, ");return");
  },
  get playSound() {
    return webpack.getFunctionBySource(this.module, "getSoundpack");
  },
};

export const StatusPickerClasses = webpack.getByProps("status", "statusItem");

export const Menu = webpack.getBySource(
  "Menu API only allows Items and groups of Items as children",
);

export const UserSettingsProtoStore = webpack.getByProps(
  "getGuildFolders",
  "getGuildRecentsDismissedAt",
);

export const UserSettingsProtoUtils = webpack.getBySource("UserSettingsProtoLastWriteTimes");
export const UserSettingsActionTypes = webpack.getExportsForProps(UserSettingsProtoUtils, [
  "SLOW_USER_ACTION",
  "DAILY",
]);

export const PanelButton = webpack.getBySource("Masks.PANEL_BUTTON");

export const { AccountDetails } = webpack.getBySource("account panel v2");

export const KeybindRecorder = webpack.getModule((m) =>
  Utils.prototypeChecker(m?.exports, ["handleComboChange", "cleanUp"]),
);
