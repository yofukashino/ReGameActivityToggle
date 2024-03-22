import { webpack } from "replugged";
import Types from "../types";

export const WindowStore = webpack.getByStoreName<Types.WindowStore>("WindowStore");

export const KeybindUtilsModule = webpack.getBySource<Types.GenericModule>("numpad plus");
export const KeybindUtils = {
  toCombo: webpack.getFunctionBySource(KeybindUtilsModule, "numpad plus"),
  toEvent: webpack.getFunctionBySource(KeybindUtilsModule, "{keyCode:0,"),
} as Types.KeybindUtils;

export const SoundUtilsModule = webpack.getBySource<Types.GenericModule>("discodo:");
export const SoundUtils = {
  createSound: webpack.getFunctionBySource(SoundUtilsModule, "return new"),
  createSoundpackSound: webpack.getFunctionBySource(SoundUtilsModule, ");return"),
  playSound: webpack.getFunctionBySource(SoundUtilsModule, "getSoundpack"),
} as Types.SoundUtils;

export const UserSettingsProtoStore =
  webpack.getByStoreName<Types.UserSettingsProtoStore>("UserSettingsProtoStore");

export const UserSettingsProtoUtils = webpack.getBySource("UserSettingsProtoLastWriteTimes");
export const UserSettingsActionTypes = webpack.getExportsForProps<Types.UserSettingsActionTypes>(
  UserSettingsProtoUtils,
  ["SLOW_USER_ACTION", "DAILY", "INFREQUENT_USER_ACTION"],
);

export const PanelButton = webpack.getBySource<Types.PanelButton>("Masks.PANEL_BUTTON");
export const AccountDetailsClasses = webpack.getByProps<Types.AccountDetailsClasses>(
  "godlike",
  "container",
);

export const ConnectedAccountsStore =
  webpack.getByStoreName<Types.ConnectedAccountsStore>("ConnectedAccountsStore");

export const ConnectedAccountsUtils = webpack.getByProps<Types.ConnectedAccountsUtils>(
  "setShowActivity",
  "refreshAccessToken",
);

export const AudioResolverPromise = webpack.waitForModule<{
  exports: Types.DefaultTypes.AnyFunction;
}>(webpack.filters.bySource("./mute.mp3"), { raw: true });
