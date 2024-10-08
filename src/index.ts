import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./style.css";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("ReGameActivityToggle", "#b380ff");
export const SettingValues = await settings.init(
  "dev.tharki.ReGameActivityToggle",
  defaultSettings,
);
export const CurrentlyPressed = new Map();
import Settings from "./Components/Settings";
import Injections from "./injections/index";
import Listeners from "./listeners/index";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));
  void Listeners.addListeners();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Listeners.removeListeners();
};

export { Settings } from "./Components/Settings";

export { _addPanelButton, _addProfileItem } from "./plaintextFunctions";
