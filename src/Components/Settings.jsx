import { common, components, util } from "replugged";
import { PluginLogger, SettingValues } from "../index.jsx";
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
const { SwitchItem, Category } = components;
import { KeybindRecorderItem } from "./KeybindItem.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (SettingValues.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    SettingValues.set(key, value);
  }
};
export const Settings = () => {
  return (
    <div>
      <Category
        {...{
          title: "Toggle Options",
          note: "Ways to toggle game activity status on current user.",
          open: true,
        }}>
        <KeybindRecorderItem
          {...{
            title: "Toggle by keybind:",
            note: "Keybind to toggle showing game activity.",
            value: SettingValues.get("keybind", defaultSettings.keybind),
            onChange: (value) => SettingValues.set("keybind", value),
          }}
        />
        <SwitchItem
          note="Show toasts on using keybind."
          {...util.useSetting(SettingValues, "showToast", defaultSettings.showToast)}>
          Show toasts
        </SwitchItem>
        <SwitchItem
          note="Add an option in the status picker to toggle showing your game activity."
          {...util.useSetting(SettingValues, "statusPicker", defaultSettings.statusPicker)}>
          Status picker
        </SwitchItem>
        <SwitchItem
          note="Add a button in the user panel to toggle showing your game activity."
          {...util.useSetting(SettingValues, "userPanel", defaultSettings.userPanel)}>
          User panel
        </SwitchItem>
        <SwitchItem
          note="Play a sound upon using the keybind or clicking the button in the status picker or user panel."
          {...util.useSetting(SettingValues, "playAudio", defaultSettings.playAudio)}>
          Play audio
        </SwitchItem>
      </Category>
    </div>
  );
};
