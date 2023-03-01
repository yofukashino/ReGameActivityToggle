import { webpack } from "replugged";
import { ContextMenu, PluginInjector, SettingValues } from "../index";
import { Menu, StatusPickerClasses } from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
import * as UserSettingStore from "../lib/UserSettingStore";
import * as Icons from "../Components/Icons";
import * as Utils from "../lib/utils";
import * as Types from "../types";

export const patchStatusPicker = (): void => {
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
              return Utils.toggleGameActivity(enabled);
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
