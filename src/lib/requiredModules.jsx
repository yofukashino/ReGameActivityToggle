import { webpack } from "replugged";
export const WindowInfoStore = webpack.getByProps("isFocused", "isElementFullScreen");

export const KeybindUtils = webpack.getModule((m) =>
  m?.exports?.Kd?.toString().includes("numpad plus"),
);

export const SoundModule = webpack.getModule((m) =>
  m?.exports?.GN?.toString().includes("getSoundpack"),
);

export const StatusPicker = webpack.getByProps("status", "statusItem");

export const Menu = webpack.getModule(
  (m) => m?.exports?.ZP?.toString().includes("navId") && m?.exports?.sN,
);

export const UserSettingsProtoStore = webpack.getByProps(
  "getGuildFolders",
  "getGuildRecentsDismissedAt",
);

export const UserSettingsProtoUtils = webpack.getModule((m) => m?.exports?.hW?.ProtoClass);

export const PanelButton = webpack.getModule((m) =>
  m?.exports?.Z?.toString?.()?.includes("Masks.PANEL_BUTTON"),
);
export const { exports: AccountDetails } = webpack.getModule(
  (m) => [".START", "shrink", "grow", "basis"].every((s) => m?.exports?.Z?.toString()?.includes(s)),
  { raw: true },
);

export const Keybind = webpack.getModule((m) => m?.exports?.Z?.prototype?.handleComboChange);
