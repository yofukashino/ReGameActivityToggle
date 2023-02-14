import { KeybindUtils } from "./requiredModules";
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
