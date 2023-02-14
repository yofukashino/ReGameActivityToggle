/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
import { Injector, Logger, common, components, settings, webpack } from "replugged";
import { Sounds, defaultSettings } from "./lib/consts.jsx";
import * as Utils from "./lib/utils.jsx";
import "./style.css";
import {
  AccountDetails,
  KeybindUtils,
  Menu,
  PanelButton,
  SoundUtils,
  StatusPickerClasses,
  WindowInfoStore,
} from "./lib/requiredModules";
import { registerSettings } from "./Components/Settings.jsx";
import * as UserSettingStore from "./lib/UserSettingStore.jsx";
import * as Icons from "./Components/Icons.jsx";
const { toast: Toasts } = common;
const { ContextMenu } = components;
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReGameActivityToggle");
export const SettingValues = await settings.init("Tharki.ReGameActivityToggle", defaultSettings);
const currentlyPressed = {};
const toggleGameActivity = (enabled: Boolean) => {
  if (SettingValues.get("playAudio", defaultSettings.playAudio))
    SoundUtils.playSound(enabled ? Sounds.Disable : Sounds.Enable, 0.5);
  UserSettingStore.setSetting("status", "showCurrentGame", !enabled);
};
const patchPanelButton = () => {
  console.log("0");
  PluginInjector.after(AccountDetails.prototype, "render", (args, res) => {
    if (!SettingValues.get("userPanel", defaultSettings.userPanel)) return res;
    const {
      props: { children },
    } = Utils.findInReactTree(res, (m) =>
      Utils.hasProps(m?.props, ["basis", "children", "grow", "shrink"]),
    );
    console.log("3");
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
interface navid {
  navId: string;
}
const patchStatusPicker = () => {
  const patchFunctionKey = webpack.getFunctionKeyBySource(Menu, ".navId") as string;
  PluginInjector.before(Menu, patchFunctionKey, (args) => {
    console.log(args);
    if (
      !SettingValues.get("statusPicker", defaultSettings.statusPicker) ||
      (args[0] as navid).navId != "account"
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
    const [{ children }] = args as any;
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
const applyInjections = () => {
  patchStatusPicker();
  patchPanelButton();
};
interface keybindlistnertypes {
  length: number;
  every: any;
}
const keybindListener = (e) => {
  const keybindEvent = KeybindUtils.toEvent(
    SettingValues.get("keybind", defaultSettings.keybind),
  ) as keybindlistnertypes;
  if (
    e.type == "keyup" &&
    keybindEvent.length &&
    keybindEvent.every(
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
const cleanKeybindsCallback = () => {
  if (WindowInfoStore.isFocused()) Utils.clearObject(currentlyPressed);
};
const addListeners = () => {
  window.addEventListener("keydown", keybindListener);
  window.addEventListener("keyup", keybindListener);
  WindowInfoStore.addChangeListener(cleanKeybindsCallback);
};
export const start = () => {
  registerSettings();
  applyInjections();
  addListeners();
};
const removeListeners = () => {
  window.removeEventListener("keydown", keybindListener);
  window.removeEventListener("keyup", keybindListener);
  WindowInfoStore.removeChangeListener(cleanKeybindsCallback);
};
export const stop = () => {
  PluginInjector.uninjectAll();
  removeListeners();
};
export { Settings } from "./Components/Settings.jsx";
