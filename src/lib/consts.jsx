import { KeybindUtils } from "./requiredModules.jsx";
export const defaultSettings = {
  statusPicker: true,
  userPanel: true,
  playAudio: true,
  showToast: true,
  keybind: KeybindUtils.toCombo("ctrl+shift+g"),
};
export const Sounds = {
  Enable: "ptt_start",
  Disable: "ptt_stop",
};
