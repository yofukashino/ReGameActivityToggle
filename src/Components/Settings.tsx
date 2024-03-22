import { common, components } from "replugged";
import { PluginLogger, SettingValues } from "../index";
const { React } = common;
import { defaultSettings } from "../lib/consts";
const { SwitchItem, Category } = components;
import KeybindRecorderItem from "./KeybindRecorderItem";
import Utils from "../lib/utils";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const Settings = React.memo((): React.ReactElement => {
  return (
    <div>
      <SwitchItem
        note="Shows an option to toggle spotify status"
        {...Utils.useSetting(SettingValues, "spotify", defaultSettings.spotify)}>
        Spotify Toggle
      </SwitchItem>
      <Category
        title="Toggle Options"
        note="Ways to toggle game activity status on current user."
        open={true}>
        <KeybindRecorderItem
          title="Toggle by keybind:"
          note="Keybind to toggle showing game activity."
          {...Utils.useSetting(SettingValues, "keybind", defaultSettings.keybind)}
        />
        <SwitchItem
          note="Show toasts on using keybind."
          {...Utils.useSetting(SettingValues, "showToast", defaultSettings.showToast)}>
          Show toasts
        </SwitchItem>
        <SwitchItem
          note="Add an option in the status picker to toggle showing your game activity."
          {...Utils.useSetting(SettingValues, "statusPicker", defaultSettings.statusPicker)}>
          Status picker
        </SwitchItem>
        <SwitchItem
          note="Add a button in the user panel to toggle showing your game activity."
          {...Utils.useSetting(SettingValues, "userPanel", defaultSettings.userPanel)}>
          User panel
        </SwitchItem>
        <Category
          title="Play audio"
          note="Play a sound upon using the keybind or clicking the button in the status picker or user panel."
          open={true}>
          <SwitchItem
            {...Utils.useSetting(
              SettingValues,
              "playAudio.gameEnable",
              defaultSettings.playAudio.gameEnable,
            )}>
            Game Activity Enable
          </SwitchItem>
          <SwitchItem
            {...Utils.useSetting(
              SettingValues,
              "playAudio.gameDisable",
              defaultSettings.playAudio.gameDisable,
            )}>
            Game Activity Disable
          </SwitchItem>
          <SwitchItem
            {...Utils.useSetting(
              SettingValues,
              "playAudio.spotifyEnable",
              defaultSettings.playAudio.spotifyEnable,
            )}>
            Spotify Activity Enable
          </SwitchItem>
          <SwitchItem
            {...Utils.useSetting(
              SettingValues,
              "playAudio.spotifyDisable",
              defaultSettings.playAudio.spotifyDisable,
            )}>
            Spotify Activity Disable
          </SwitchItem>
          <SwitchItem
            {...Utils.useSetting(
              SettingValues,
              "playAudio.spotifyToogle",
              defaultSettings.playAudio.spotifyToogle,
            )}>
            Spotify Activity Toogle All
          </SwitchItem>
        </Category>
      </Category>
    </div>
  );
});
