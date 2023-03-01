import { CurrentlyPressed, SettingValues, Toasts } from "../index";
import { defaultSettings } from "../lib/consts";
import { KeybindUtils } from "../lib/requiredModules";
import * as UserSettingStore from "../lib/UserSettingStore";
import * as Utils from "../lib/utils";
import * as Types from "../types";
export const keybindListener = (e: Types.KeybindEvent): void => {
  const keybindEvents = KeybindUtils.toEvent(
    SettingValues.get("keybind", defaultSettings.keybind),
  ) as Types.KeybindEvents;
  if (
    e.type === "keyup" &&
    keybindEvents.length &&
    keybindEvents.every(
      (ev) =>
        Object.keys(ev)
          .filter((k) => k !== "keyCode")
          .every((k) => ev[k] === e[k]) && CurrentlyPressed.get(ev.keyCode),
    )
  ) {
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    if (SettingValues.get("showToast", defaultSettings.showToast))
      Toasts.toast(`${enabled ? "Disabled" : "Enabled"} Game Activity`, Toasts.Kind.SUCCESS);
    Utils.toggleGameActivity(enabled);
  }
  CurrentlyPressed.set(e.keyCode, e.type === "keydown");
};
