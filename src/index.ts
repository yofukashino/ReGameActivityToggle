import { Injector, Logger, common, components, settings } from "replugged";

import "./style.css";
import { registerSettings } from "./Components/Settings";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReGameActivityToggle");
export const SettingValues = await settings.init("dev.tharki.ReGameActivityToggle");
export const { toast: Toasts } = common;
export const { ContextMenu } = components;
export const CurrentlyPressed = new Map();
import { applyInjections } from "./patches/index";
import { addListeners, removeListeners } from "./listeners/index";

export const start = (): void => {
  registerSettings();
  applyInjections();
  addListeners();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  removeListeners();
};

export { addPanelButton } from "./patches/AccountDetails";

export { Settings } from "./Components/Settings.jsx";
