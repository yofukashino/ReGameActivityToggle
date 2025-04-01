import { types } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";
import { ContextMenuProps } from "replugged/dist/renderer/modules/components/ContextMenu";
import type util from "replugged/util";

export namespace Types {
  export import DefaultTypes = types;
  export type MenuProps = ContextMenuProps["ContextMenu"] & { children: React.ReactElement[] };
  export type UtilTree = util.Tree;
  export type ReactTree = util.Tree & React.ReactElement;
  export type GenericModule = Record<string, DefaultTypes.AnyFunction>;
  export interface AudioResolver {
    exports: Types.DefaultTypes.AnyFunction & { keys: () => string[] };
  }
  export type ProfileItem = React.ComponentType<{
    label: string;
    id: string;
    icon: () => React.ReactElement;
    onClick: () => void;
    renderSubmenu?: ({ closePopout }: { closePopout: () => void }) => React.ReactElement;
  }>;
  export enum UserSettingsDelay {
    AUTOMATED = 30,
    DAILY = 86400,
    FREQUENT_USER_ACTION = 10,
    INFREQUENT_USER_ACTION = 0,
    SLOW_USER_ACTION = 20,
  }
  export interface SettingsActionCreators {
    ProtoClass: {
      defaultCheckDepth: number;
      fields: unknown[];
      optionsobject;
      typeName: string;
      binaryReadMap1: DefaultTypes.AnyFunction;
      create: DefaultTypes.AnyFunction;
      internalBinaryRead: DefaultTypes.AnyFunction;
      internalBinaryWrite: DefaultTypes.AnyFunction;
    };
    beforeSendCallbacks: Array<{
      hasChanges: () => boolean;
      processProto: () => void;
    }>;
    lastSendTime: number;
    logger: {
      error: DefaultTypes.AnyFunction;
      fileOnly: DefaultTypes.AnyFunction;
      info: DefaultTypes.AnyFunction;
      log: DefaultTypes.AnyFunction;
      logDangerously: DefaultTypes.AnyFunction;
      name: string;
      time: DefaultTypes.AnyFunction;
      trace: DefaultTypes.AnyFunction;
      verbose: DefaultTypes.AnyFunction;
      verboseDangerously: DefaultTypes.AnyFunction;
      warn: DefaultTypes.AnyFunction;
    };
    persistChanges: DefaultTypes.AnyFunction;
    type: number;
    dispatchChanges: DefaultTypes.AnyFunction;
    getCurrentValue: DefaultTypes.AnyFunction;
    getEditInfo: DefaultTypes.AnyFunction;
    loadIfNecessary: DefaultTypes.AnyFunction;
    markDirty: DefaultTypes.AnyFunction;
    markDirtyFromMigration: DefaultTypes.AnyFunction;
    markDirtyIfHasPendingChange: DefaultTypes.AnyFunction;
    saveLastSendTime: DefaultTypes.AnyFunction;
    scheduleSaveFromOfflineEdit: DefaultTypes.AnyFunction;
    updateAsync: (
      category: string,
      setter: Types.DefaultTypes.AnyFunction,
      type: string | number,
    ) => void;
  }
  export interface UserSettingsActionUtils {
    FrecencyUserSettingsActionCreators?: SettingsActionCreators;
    PreloadedUserSettingsActionCreators: SettingsActionCreators;
    UserSettingsActionCreatorsByType?: Record<number, SettingsActionCreators>;
    UserSettingsDelay: typeof UserSettingsDelay;
    addDismissedContent?: DefaultTypes.AnyFunction;
    checkAllDismissedContents?: DefaultTypes.AnyFunction;
    clearDismissedContents?: DefaultTypes.AnyFunction;
    removeDismissedContent?: DefaultTypes.AnyFunction;
    updateUserChannelSettings?: DefaultTypes.AnyFunction;
    updateUserGuildSettings?: DefaultTypes.AnyFunction;
  }
  export interface WindowStore extends Store {
    isFocused: () => boolean;
    addChangeListener: (callback: DefaultTypes.AnyFunction) => void;
    removeChangeListener: (callback: DefaultTypes.AnyFunction) => void;
    isElementFullScreen: () => boolean;
  }
  export type PanelButton = React.ComponentClass<{
    onContextMenu?: (event: React.MouseEvent) => void;
    icon?: () => React.ReactNode;
    tooltipText?: string;
    onClick?: () => void;
  }>;
  export interface UserSettingsProtoStore extends Store {
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
  export interface ConnectedAccountsStore extends Store {
    getAccount: DefaultTypes.AnyFunction;
    getAccounts: () => Array<{
      type: string;
      id: string;
      name: string;
      showActivity: boolean;
    }>;
    getLocalAccount: DefaultTypes.AnyFunction;
    getLocalAccounts: DefaultTypes.AnyFunction;
    isFetching: DefaultTypes.AnyFunction;
    isJoining: DefaultTypes.AnyFunction;
    isSuggestedAccountType: DefaultTypes.AnyFunction;
  }
  export interface ConnectedAccountsUtils {
    authorize: DefaultTypes.AnyFunction;
    callback: DefaultTypes.AnyFunction;
    completeTwoWayLink: DefaultTypes.AnyFunction;
    connect: DefaultTypes.AnyFunction;
    disconnect: DefaultTypes.AnyFunction;
    fetch: DefaultTypes.AnyFunction;
    joinServer: DefaultTypes.AnyFunction;
    linkDispatchAuthCallback: DefaultTypes.AnyFunction;
    refresh: DefaultTypes.AnyFunction;
    refreshAccessToken: DefaultTypes.AnyFunction;
    setFriendSync: DefaultTypes.AnyFunction;
    setMetadataVisibility: DefaultTypes.AnyFunction;
    setShowActivity: DefaultTypes.AnyFunction;
    setVisibility: DefaultTypes.AnyFunction;
    submitPinCode: DefaultTypes.AnyFunction;
    update: DefaultTypes.AnyFunction;
  }
  export type MenuArgs = Array<{
    navId: string;
    children: [React.ReactElement];
  }>;
  export interface KeybindEvent {
    type: string;
    altKey: boolean;
    ctrlKey: boolean;
    keyCode: number;
    metaKey: boolean;
    shiftKey: boolean;
  }
  export type CurrentlyPressed = Record<number, KeybindEvent>;

  export type KeybindEvents = KeybindEvent[];

  export interface KeybindUtils {
    toCombo: DefaultTypes.AnyFunction;
    toBrowserEvents: DefaultTypes.AnyFunction;
  }
  export interface SoundUtils {
    createSound: DefaultTypes.AnyFunction;
    createSoundForPack: DefaultTypes.AnyFunction;
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
    value?: number[][];
    onChange?: (value: number[][]) => void;
    disabled?: boolean;
    clearable?: boolean;
  }
  export interface Modules {
    loadModules?: () => Promise<void>;
    WindowStore?: WindowStore;
    SoundUtilsModule?: GenericModule;
    SoundUtils?: SoundUtils;
    KeybindUtilsModule?: GenericModule;
    KeybindUtils?: KeybindUtils;
    UserSettingsProtoStore?: UserSettingsProtoStore;
    UserSettingsActionUtilsModule?: Record<string, Types.SettingsActionCreators>;
    UserSettingsActionUtils?: UserSettingsActionUtils;
    PanelButton?: PanelButton;
    ConnectedAccountsStore?: ConnectedAccountsStore;
    ConnectedAccountsUtils?: ConnectedAccountsUtils;
    AudioResolverPromise?: Promise<AudioResolver>;
  }
  export type Jsonifiable =
    | null
    | undefined
    | boolean
    | number
    | string
    | Jsonifiable[]
    | { [key: string]: Jsonifiable };
  export type ValType<T> =
    | T
    | React.ChangeEvent<HTMLInputElement>
    | (Record<string, unknown> & { value?: T; checked?: T });

  export type NestedType<T, P> = P extends
    | `${infer Left}.${infer Right}`
    | `${infer Left}/${infer Right}`
    | `${infer Left}-${infer Right}`
    ? Left extends keyof T
      ? NestedType<T[Left], Right>
      : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? NestedType<Exclude<T[FieldKey], undefined> extends infer U ? U : never, IndexKey>
        : undefined
      : undefined
    : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer _IndexKey}]`
    ? FieldKey extends keyof T
      ? Exclude<T[FieldKey], undefined> extends infer U
        ? U
        : never
      : undefined
    : undefined;

  export interface Settings {
    spotify: boolean;
    statusPicker: boolean;
    userPanel: boolean;
    showToast: boolean;
    keybind: Array<{
      altKey: boolean;
      code: string;
      ctrlKey: boolean;
      key: string;
      keyCode: number;
      metaKey: boolean;
      shiftKey: boolean;
    }>;
    playAudio: {
      gameDisable: boolean;
      gameEnable: boolean;
      spotifyDisable: boolean;
      spotifyEnable: boolean;
      spotifyToogle: boolean;
    };
  }
}
export default Types;

declare global {
  export const DiscordNative: {
    isRenderer: boolean;
    nativeModules: {
      ensureModule: (
        name:
          | "discord_desktop_core"
          | "discord_erlpack"
          | "discord_game_utils"
          | "discord_krisp"
          | "discord_rpc"
          | "discord_spellcheck"
          | "discord_utils"
          | "discord_voice"
          | "discord_zstd",
      ) => Promise<undefined>;
      requireModule: (name: "discord_utils") => {
        inputEventRegister: (
          id: number,
          keyCode: number[][],
          cb: () => void,
          /**
           * Represents the state of input focus and key events.
           *
           * - `focused` is `true` by default if neither `focused` nor `blurred` is explicitly set or set to `false`.
           * - `keydown` is `true` by default if neither `keydown` nor `keyup` is explicitly set or set to `false`.
           *
           */
          options?: Partial<{ focused?: true; blurred?: true; keyup?: true; keydown?: true }>,
        ) => void;
        inputEventUnregister: (id: number) => void;
      };
    };
  };
}
