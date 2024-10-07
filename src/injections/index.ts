import Modules from "../lib/requiredModules";
import injectAudioResolver from "./AudioResolver";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  void injectAudioResolver();
};

export default { applyInjections };
