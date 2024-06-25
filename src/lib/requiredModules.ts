import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.SoundUtilsModule = await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource("SoundUtils"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find SoundUtils Module");
    });

  Modules.SoundUtils ??= {
    createSound: webpack.getFunctionBySource(Modules.SoundUtilsModule, "return new"),
    createSoundForPack: webpack.getFunctionBySource(Modules.SoundUtilsModule, /return .\(null/),
    playSound: webpack.getFunctionBySource(Modules.SoundUtilsModule, ".play()"),
  };

  Modules.KeybindUtilsModule ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource("numpad plus"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find KeybindUtils Module");
    });

  Modules.KeybindUtils ??= {
    toCombo: webpack.getFunctionBySource(Modules.KeybindUtilsModule, "numpad plus"),
    toBrowserEvents: webpack.getFunctionBySource(Modules.KeybindUtilsModule, "{keyCode:0,"),
  };
  Modules.UserSettingsActionUtilsModule ??= await webpack.waitForModule<
    Record<string, Types.SettingsActionCreators>
  >(webpack.filters.bySource("UserSettingsProtoLastWriteTimes"));

  Modules.UserSettingsActionUtils ??= {
    PreloadedUserSettingsActionCreators: Object.values(
      Modules.UserSettingsActionUtilsModule,
    )?.find?.((n) => n?.updateAsync && n?.ProtoClass?.typeName?.endsWith(".PreloadedUserSettings")),
    UserSettingsDelay: webpack.getExportsForProps(Modules.UserSettingsActionUtilsModule, [
      "AUTOMATED",
      "DAILY",
    ]),
  };

  Modules.PanelButton ??= await webpack
    .waitForModule<Types.PanelButton>(webpack.filters.bySource("Masks.PANEL_BUTTON"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find PanelButton Module");
    });

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
