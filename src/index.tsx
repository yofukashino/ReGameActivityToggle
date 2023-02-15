/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
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
const currentlyPressed = {} as Types.KeybindEvent;
const toggleGameActivity = (enabled: Boolean) => {
  if (SettingValues.get("playAudio", defaultSettings.playAudio))
    SoundUtils.playSound(enabled ? Sounds.Disable : Sounds.Enable, 0.5);
  UserSettingStore.setSetting("status", "showCurrentGame", !enabled);
  if (SettingValues.get("userPanel", defaultSettings.userPanel))
    Utils.forceUpdate(document.querySelector(AccountDetailsClasses.container));
};
const patchPanelButton = (): void => {
  PluginInjector.after(AccountDetails.prototype, "render", (args: [], res: Types.ReactElement) => {
    if (!SettingValues.get("userPanel", defaultSettings.userPanel)) return res;
    const {
      props: { children },
    } = Utils.findInReactTree(res, (m: Types.ReactElement) =>
      Utils.hasProps(m?.props, ["basis", "children", "grow", "shrink"]),
    );
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    const Icon = Icons.Controller("20", "20");

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
      // @ts-expect-error neutral face
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
  });
};

const patchStatusPicker = () => {
  const patchFunctionKey = webpack.getFunctionKeyBySource(
    Menu as Types.DefaultTypes.ObjectExports,
    ".navId",
  ) as never;
  PluginInjector.before(Menu, patchFunctionKey, (args: Types.MenuArgs) => {
    if (
      !SettingValues.get("statusPicker", defaultSettings.statusPicker) ||
      args[0].navId != "account"
    )
      return args;
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    const Icon = Utils.addStyle(Icons.Controller("16", "16"), {
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
    const switchAccount = children.find((c) => c?.props?.children?.key == "switch-account");
    if (!children.find((c) => c?.props?.className == "tharki"))
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
    const section = children.find((c) => c?.props?.className == "tharki");
    if (!section.props.children.find((m) => m?.props?.id == "game-activity"))
      section.props.children.push(
        // @ts-expect-error don't know what to do here
        <ContextMenu.MenuItem
          {...{
            id: "game-activity",
            keepItemStyles: true,
            action: () => {
              return toggleGameActivity(enabled);
            },
            render: () => (
              <div
                {...{
                  className: StatusPickerClasses.statusItem as string,
                  "aria-label": `${enabled ? "Hide" : "Show"} Game Activity`,
                }}>
                {enabled ? DisabledIcon : Icon}
                <div
                  {...{
                    className: StatusPickerClasses.status as string,
                  }}>{`${enabled ? "Hide" : "Show"} Game Activity`}</div>
                <div
                  {...{
                    className: StatusPickerClasses.description as string,
                  }}>{`${
                  enabled ? "Disable" : "Enable"
                } displaying currently running game in your activity status.`}</div>
              </div>
            ),
          }}
        />,
      );
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
    e.type == "keyup" &&
    keybindEvents.length &&
    keybindEvents.every(
      (ev) =>
        Object.keys(ev)
          .filter((k) => k !== "keyCode")
          .every((k) => ev[k] == e[k]) && currentlyPressed[ev.keyCode],
    )
  ) {
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    if (SettingValues.get("showToast", defaultSettings.showToast))
      Toasts.toast(`${enabled ? "Disabled" : "Enabled"} Game Activity`, Toasts.Kind.SUCCESS);
    toggleGameActivity(enabled);
  }
  currentlyPressed[e.keyCode] = e.type == "keydown";
};
const cleanKeybindsCallback = (): void => {
  if (WindowInfoStore.isFocused()) Utils.clearObject(currentlyPressed);
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
