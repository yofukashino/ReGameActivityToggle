import Modules from "../lib/requiredModules";
import injectAccountContextMenu from "./AccountContextMenu";
import injectAudioResolver from "./AudioResolver";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectAccountContextMenu();
  void injectAudioResolver();
};

export default { applyInjections };
