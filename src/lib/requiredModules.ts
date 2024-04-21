import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.SoundUtils ??= await webpack.waitForProps<Types.SoundUtils>(
    "playSound",
    "createSound",
    "createSoundForPack",
  );
  Modules.KeybindUtils ??= await webpack.waitForProps<Types.KeybindUtils>("toCombo");
  Modules.UserSettingsActionUtils ??= await webpack.waitForProps<Types.UserSettingsActionUtils>(
    "PreloadedUserSettingsActionCreators",
  );
  Modules.PanelButton = await webpack.waitForModule<Types.PanelButton>(
    webpack.filters.bySource("Masks.PANEL_BUTTON"),
  );
  Modules.ConnectedAccountsUtils ??= await webpack.waitForProps<Types.ConnectedAccountsUtils>(
    "setShowActivity",
    "refreshAccessToken",
  );
  Modules.AudioResolverPromise = webpack.waitForModule<Types.AudioResolver>(
    webpack.filters.bySource("./mute.mp3"),
    { raw: true },
  );
  Modules.UserSettingsProtoStore ??=
    webpack.getByStoreName<Types.UserSettingsProtoStore>("UserSettingsProtoStore");
  Modules.WindowStore ??= webpack.getByStoreName<Types.WindowStore>("WindowStore");
  Modules.ConnectedAccountsStore ??=
    webpack.getByStoreName<Types.ConnectedAccountsStore>("ConnectedAccountsStore");
};

export default Modules;
