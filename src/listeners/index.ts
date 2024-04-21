import Modules from "../lib/requiredModules";
import CleanKeybindsCallback from "./CleanCallback";
import KeybindListener from "./KeybindListener";

export const addListeners = async (): Promise<void> => {
  await Modules.loadModules();
  Modules.WindowStore?.addChangeListener(CleanKeybindsCallback);
  window.addEventListener("keydown", KeybindListener);
  window.addEventListener("keyup", KeybindListener);
};
export const removeListeners = (): void => {
  Modules.WindowStore?.removeChangeListener(CleanKeybindsCallback);
  window.removeEventListener("keydown", KeybindListener);
  window.removeEventListener("keyup", KeybindListener);
};

export default { addListeners, removeListeners };
