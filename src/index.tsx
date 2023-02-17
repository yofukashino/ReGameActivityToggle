import { Injector, Logger, common, components, settings, webpack } from "replugged";
import { Sounds, defaultSettings } from "./lib/consts";
import * as Utils from "./lib/utils";
import * as Types from "./types";
import "./style.css";
import {
  AccountDetails,
  AccountDetailsClasses,
  KeybindUtils,
  Menu,
  PanelButton,
  SoundUtils,
  StatusPickerClasses,
  WindowInfoStore,
} from "./lib/requiredModules";
import { registerSettings } from "./Components/Settings";
import * as UserSettingStore from "./lib/UserSettingStore";
import * as Icons from "./Components/Icons";
const { toast: Toasts } = common;
const { ContextMenu } = components;
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReGameActivityToggle");
export const SettingValues = await settings.init("Tharki.ReGameActivityToggle", defaultSettings);
const currentlyPressed = new Map();
const toggleGameActivity = (enabled: Boolean) => {
  if (SettingValues.get("playAudio", defaultSettings.playAudio))
    SoundUtils.playSound(enabled ? Sounds.Disable : Sounds.Enable, 0.5);
  UserSettingStore.setSetting("status", "showCurrentGame", !enabled);
  if (SettingValues.get("userPanel", defaultSettings.userPanel))
    Utils.forceUpdate(document.querySelector(AccountDetailsClasses.container));
};
const patchPanelButton = (): void => {
  PluginInjector.after(
    AccountDetails.prototype,
    "render",
    (args: [], res: Types.ReactElement): Types.ReactElement => {
      if (!SettingValues.get("userPanel", defaultSettings.userPanel)) return res;

      const flexBox = Utils.findInReactTree(res, (m: Types.ReactElement) =>
        Utils.hasProps(m?.props, ["basis", "children", "grow", "shrink"]),
      );
      console.log(res, flexBox);
      if (!flexBox) return res;
      const {
        props: { children },
      } = flexBox as Types.ReactElement;
      const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
      const Icon = Icons.controller("20", "20");
      const DisabledIcon = Utils.addChilds(
        Icon,
        <polygon
          {...{
            style: {
              fill: "#a61616",
            },
            points:
              "22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 ",
          }}
        />,
      );
      children.unshift(
        <PanelButton
          {...{
            icon: () => (enabled ? Icon : DisabledIcon),
            tooltipText: `${enabled ? "Hide" : "Show"} Game Activity`,
            onClick: () => {
              toggleGameActivity(enabled);
            },
          }}
        />,
      );
      return res;
    },
  );
};

const patchStatusPicker = () => {
  const patchFunctionKey = webpack.getFunctionKeyBySource(Menu, ".navId") as never;
  PluginInjector.before(Menu, patchFunctionKey, (args: Types.MenuArgs): Types.MenuArgs => {
    if (
      !SettingValues.get("statusPicker", defaultSettings.statusPicker) ||
      args[0].navId !== "account"
    )
      return args;
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    const Icon = Utils.addStyle(Icons.controller("16", "16"), {
      marginLeft: "-2px",
    });
    const DisabledIcon = Utils.addChilds(
      Icon,
      <polygon
        {...{
          style: {
            fill: "#a61616",
          },
          points:
            "22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 ",
        }}
      />,
    );
    const [{ children }] = args;
    const switchAccount = children.find((c) => c?.props?.children?.key === "switch-account");
    if (!children.find((c) => c?.props?.className === "tharki"))
      children.splice(
        children.indexOf(switchAccount),
        0,
        <ContextMenu.MenuGroup
          {...{
            className: "tharki",
            children: [],
          }}
        />,
      );
    const section = children.find((c) => c?.props?.className === "tharki");
    if (!section.props.children.find((m) => m?.props?.id === "game-activity"))
      section.props.children.push(
        <ContextMenu.MenuItem
          {...{
            label: "Game Activity",
            id: "game-activity",
            keepItemStyles: true,
            action: () => {
              return toggleGameActivity(enabled);
            },
            render: () => (
              <div
                {...{
                  className: StatusPickerClasses.statusItem,
                  "aria-label": `${enabled ? "Hide" : "Show"} Game Activity`,
                }}>
                {enabled ? DisabledIcon : Icon}
                <div
                  {...{
                    className: StatusPickerClasses.status,
                  }}>{`${enabled ? "Hide" : "Show"} Game Activity`}</div>
                <div
                  {...{
                    className: StatusPickerClasses.description,
                  }}>{`${
                  enabled ? "Disable" : "Enable"
                } displaying currently running game in your activity status.`}</div>
              </div>
            ),
          }}
        />,
      );
    return args;
  });
};
const applyInjections = (): void => {
  patchStatusPicker();
  patchPanelButton();
};
const keybindListener = (e: Types.KeybindEvent): void => {
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
          .every((k) => ev[k] === e[k]) && currentlyPressed.get(ev.keyCode),
    )
  ) {
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    if (SettingValues.get("showToast", defaultSettings.showToast))
      Toasts.toast(`${enabled ? "Disabled" : "Enabled"} Game Activity`, Toasts.Kind.SUCCESS);
    toggleGameActivity(enabled);
  }
  currentlyPressed.set(e.keyCode, e.type === "keydown");
};
const cleanKeybindsCallback = (): void => {
  if (WindowInfoStore.isFocused()) currentlyPressed.clear();
};
const addListeners = (): void => {
  window.addEventListener("keydown", keybindListener);
  window.addEventListener("keyup", keybindListener);
  WindowInfoStore.addChangeListener(cleanKeybindsCallback);
};
export const start = (): void => {
  registerSettings();
  applyInjections();
  addListeners();
};
const removeListeners = (): void => {
  window.removeEventListener("keydown", keybindListener);
  window.removeEventListener("keyup", keybindListener);
  WindowInfoStore.removeChangeListener(cleanKeybindsCallback);
};
export const stop = (): void => {
  PluginInjector.uninjectAll();
  removeListeners();
};
export { Settings } from "./Components/Settings.jsx";
