import { toast as Toasts } from "replugged/common";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Listeners from "../lib/Keybind";
import UserSettingStore from "../lib/UserSettingStore";

const KeybindListener = new Listeners();

export const addListeners = (): void => {
  const KeyCode = SettingValues.get("keybind", defaultSettings.keybind);
  // Not Global Because https://discord.com/channels/919649417005506600/919727473233649674/1355126497580417044
  if (KeyCode.length)
    KeybindListener.addListener(KeyCode, () => {
      const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
      if (SettingValues.get("showToast", defaultSettings.showToast))
        Toasts.toast(`${enabled ? "Disabled" : "Enabled"} Game Activity`, Toasts.Kind.SUCCESS);
      Utils.toggleGameActivity(enabled);
    });
};
export const removeListeners = (): void => {
  KeybindListener.unlistenAll();
};

export const renewListeners = (): void => {
  removeListeners();
  addListeners();
};

export default { addListeners, removeListeners, renewListeners };
