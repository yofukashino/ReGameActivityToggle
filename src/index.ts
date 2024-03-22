import { Injector, Logger, settings } from "replugged";
import "./style.css";
import { registerSettings } from "./Components/Settings";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("ReGameActivityToggle");
export const SettingValues = await settings.init("dev.tharki.ReGameActivityToggle");
export const CurrentlyPressed = new Map();
import Injections from "./patches/index";
import Listeners from "./listeners/index";

export const start = (): void => {
  registerSettings();
  Injections.applyInjections();
  Listeners.addListeners();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Listeners.removeListeners();
};

export { _addPanelButton } from "./Components/AccountDetailsButton";

export { Settings } from "./Components/Settings.jsx";
