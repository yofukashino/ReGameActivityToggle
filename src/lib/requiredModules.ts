import { webpack } from "replugged";
import Types from "../types";

export const WindowStore = webpack.getByStoreName<Types.WindowStore>("WindowStore");

export const SoundUtils = webpack.getByProps<Types.SoundUtils>(
  "playSound",
  "createSound",
  "createSoundForPack",
);
export const KeybindUtils = webpack.getByProps<Types.KeybindUtils>("toCombo");

export const UserSettingsProtoStore =
  webpack.getByStoreName<Types.UserSettingsProtoStore>("UserSettingsProtoStore");

export const UserSettingsProtoUtils = webpack.getBySource("UserSettingsProtoLastWriteTimes");
export const UserSettingsActionTypes = webpack.getExportsForProps<Types.UserSettingsActionTypes>(
  UserSettingsProtoUtils,
  ["SLOW_USER_ACTION", "DAILY", "INFREQUENT_USER_ACTION"],
);

export const PanelButton = webpack.getBySource<Types.PanelButton>("Masks.PANEL_BUTTON");

export const ConnectedAccountsStore =
  webpack.getByStoreName<Types.ConnectedAccountsStore>("ConnectedAccountsStore");

export const ConnectedAccountsUtils = webpack.getByProps<Types.ConnectedAccountsUtils>(
  "setShowActivity",
  "refreshAccessToken",
);

export const AudioResolverPromise = webpack.waitForModule<{
  exports: Types.DefaultTypes.AnyFunction & { keys: () => string[] };
}>(webpack.filters.bySource("./mute.mp3"), { raw: true });
