import { types as DefaultTypes } from "replugged";
export { types as DefaultTypes } from "replugged";
import type { ReactElement } from "react";
export type { ReactElement, ComponentClass, ReactNode } from "react";
export interface GenericModule extends Record<string, DefaultTypes.AnyFunction> {}
export interface UserSettingsActionTypes {
  AUTOMATED: number;
  DAILY: number;
  FREQUENT_USER_ACTION: number;
  INFREQUENT_USER_ACTION: number;
  SLOW_USER_ACTION: number;
}
export interface WindowInfoStore {
  isFocused: () => boolean;
  addChangeListener: (callback: DefaultTypes.AnyFunction) => void;
  removeChangeListener: (callback: DefaultTypes.AnyFunction) => void;
  isElementFullScreen: () => boolean;
}
export interface UserSettingsProtoStore {
  getDismissedGuildContent: DefaultTypes.AnyFunction;
  getFullState: DefaultTypes.AnyFunction;
  getGuildFolders: DefaultTypes.AnyFunction;
  getGuildRecentsDismissedAt: DefaultTypes.AnyFunction;
  getState: DefaultTypes.AnyFunction;
  hasLoaded: DefaultTypes.AnyFunction;
  initialize: DefaultTypes.AnyFunction;
  constructor: DefaultTypes.AnyFunction;
  frecencyWithoutFetchingLatest: object;
  settings: object;
  wasMostRecentUpdateFromServer: boolean;
}
export interface MenuArgs
  extends Array<{
    navId: string;
    children: [ReactElement];
  }> {}
export interface KeybindEvent {
  type: string;
  altKey: boolean;
  ctrlKey: boolean;
  keyCode: number;
  metaKey: boolean;
  shiftKey: boolean;
}
export interface CurrentlyPressed {
  [key: number]: KeybindEvent;
}
export interface KeybindEvents extends Array<KeybindEvent> {}

export interface AccountDetailsClasses {
  accountProfilePopoutWrapper: string;
  avatar: string;
  avatarWrapper: string;
  buildOverrideButton: string;
  canCopy: string;
  container: string;
  copySuccess: string;
  customStatus: string;
  emoji: string;
  godlike: string;
  hasBuildOverride: string;
  nameTag: string;
  panelSubtextContainer: string;
  panelTitleContainer: string;
  redIcon: string;
  statusTooltip: string;
  strikethrough: string;
  usernameContainer: string;
  withTagAsButton: string;
  withTagless: string;
}
export interface KeybindUtils {
  toCombo: DefaultTypes.AnyFunction;
  toEvent: DefaultTypes.AnyFunction;
}
export interface SoundUtils {
  createSound: DefaultTypes.AnyFunction;
  createSoundpackSound: DefaultTypes.AnyFunction;
  playSound: DefaultTypes.AnyFunction;
}
export interface CloseButtonProps {
  size?: string;
  className?: string;
  onClick?: () => void;
}
export interface KeybindRecorderItemProps {
  title?: string;
  note?: string;
  size?: string;
  className?: string;
  value?: unknown;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
  clearable?: boolean;
}
export interface KeybindRecorderItemState {
  value: boolean | string | unknown[];
}
export interface StatusPickerClasses {
  description: string;
  divider: string;
  icon: string;
  mainStatusIcon: string;
  menu: string;
  menuItemFocused: string;
  menuItemFocusedPremium: string;
  modal: string;
  status: string;
  statusItem: string;
  statusPickerModalMenu: string;
}

export interface Settings {
  statusPicker: boolean;
  userPanel: boolean;
  playAudio: boolean;
  showToast: boolean;
  keybind: unknown[];
}
