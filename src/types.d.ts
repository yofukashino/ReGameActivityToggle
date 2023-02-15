import { types as DefaultTypes, common } from "replugged";
export { types as DefaultTypes } from "replugged";
const { React } = common;
import { ReactElement } from "react";
export { ReactElement } from "react";
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
export interface Settings {
  statusPicker: boolean;
  userPanel: boolean;
  playAudio: boolean;
  showToast: boolean;
  keybind: unknown[];
}
export class CloseButton extends React.Component {
  public props: {
    size?: string;
    className?: string;
    onClick?: () => void;
  };
}
export class KeybindRecorderItem extends React.Component {
  public props: {
    title?: string;
    note?: string;
    size?: string;
    className?: string;
    value?: unknown;
    onClick?: () => void;
    onChange?: (arg0: unknown) => void;
    disabled?: boolean;
    clearable?: boolean;
  };
  public state: {
    value: boolean;
  };
}
