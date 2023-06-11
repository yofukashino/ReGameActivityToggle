import { webpack } from "replugged";
import * as Types from "../types";

export const WindowInfoStore = webpack.getByProps<Types.WindowInfoStore>(
  "isFocused",
  "isElementFullScreen",
  "addChangeListener",
  "removeChangeListener",
);
export const KeybindUtilsModule = webpack.getBySource<Types.GenericModule>("numpad plus");
export const KeybindUtils = {
  toCombo: webpack.getFunctionBySource(KeybindUtilsModule, "numpad plus"),
  toEvent: webpack.getFunctionBySource(KeybindUtilsModule, /(?=.*keyCode)(?=.*BROWSER)/),
} as Types.KeybindUtils;
export const SoundUtilsModule = webpack.getBySource<Types.GenericModule>(
  /function.*\.disableSounds.*\.getSoundpack\(\).*play\(\).*return/,
);
export const SoundUtils = {
  createSound: webpack.getFunctionBySource(SoundUtilsModule, "return new"),
  createSoundpackSound: webpack.getFunctionBySource(SoundUtilsModule, ");return"),
  playSound: webpack.getFunctionBySource(SoundUtilsModule, "getSoundpack"),
} as Types.SoundUtils;

export const StatusPickerClasses = webpack.getByProps<Types.StatusPickerClasses>(
  "status",
  "statusItem",
);

export const UserSettingsProtoStore = webpack.getByProps<Types.UserSettingsProtoStore>(
  "getGuildFolders",
  "getGuildRecentsDismissedAt",
  "settings",
);

export const UserSettingsProtoUtils = webpack.getBySource("UserSettingsProtoLastWriteTimes");
export const UserSettingsActionTypes = webpack.getExportsForProps<Types.UserSettingsActionTypes>(
  UserSettingsProtoUtils,
  ["SLOW_USER_ACTION", "DAILY", "INFREQUENT_USER_ACTION"],
);

export const PanelButton = webpack.getBySource<Types.ComponentClass>("Masks.PANEL_BUTTON");

export const AccountDetailsClasses = webpack.getByProps<Types.AccountDetailsClasses>(
  "godlike",
  "container",
);
