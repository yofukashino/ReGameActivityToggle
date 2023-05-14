import { common, components, util } from "replugged";
import { PluginLogger, SettingValues } from "../index";
const { React } = common;
import { defaultSettings } from "../lib/consts";
const { SwitchItem, Category } = components;
import KeybindRecorderItem from "./KeybindRecorderItem";
import * as Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const Settings = (): Types.ReactElement => {
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
            ...util.useSetting(SettingValues, "keybind", defaultSettings.keybind),
          }}
        />
        <SwitchItem
          {...{
            note: "Show toasts on using keybind.",
            ...util.useSetting(SettingValues, "showToast", defaultSettings.showToast),
          }}>
          Show toasts
        </SwitchItem>
        <SwitchItem
          {...{
            note: "Add an option in the status picker to toggle showing your game activity.",
            ...util.useSetting(SettingValues, "statusPicker", defaultSettings.statusPicker),
          }}>
          Status picker
        </SwitchItem>
        <SwitchItem
          {...{
            note: "Add a button in the user panel to toggle showing your game activity.",
            ...util.useSetting(SettingValues, "userPanel", defaultSettings.userPanel),
          }}>
          User panel
        </SwitchItem>
        <SwitchItem
          {...{
            note: "Play a sound upon using the keybind or clicking the button in the status picker or user panel.",
            ...util.useSetting(SettingValues, "playAudio", defaultSettings.playAudio),
          }}>
          Play audio
        </SwitchItem>
      </Category>
    </div>
  );
};
