import { settings, util } from "replugged";
import { React, lodash } from "replugged/common";
import { PluginInjector, PluginLogger, SettingValues } from "../index";
import Modules from "./requiredModules";
import { Sounds, defaultSettings } from "./consts";
import UserSettingStore from "./UserSettingStore";
import Types from "../types";
export const forceRerenderElement = async (selector: string): Promise<void> => {
  const element = await util.waitFor(selector);
  if (!element) return;
  const ownerInstance = util.getOwnerInstance(element);
  const unpatchRender = PluginInjector.instead(ownerInstance, "render", () => {
    unpatchRender();
    return null;
  });
  ownerInstance.forceUpdate(() => ownerInstance.forceUpdate(() => {}));
};

export const toggleGameActivity = (enabled: boolean): void => {
  if (
    (enabled && (SettingValues.get("playAudio", defaultSettings.playAudio).gameDisable ?? true)) ||
    (!enabled && (SettingValues.get("playAudio", defaultSettings.playAudio).gameEnable ?? true))
  ) {
    Modules.SoundUtils.playSound(enabled ? Sounds.GameDisable : Sounds.GameEnable, 0.5);
  }
  PluginLogger.log(`${enabled ? "Disabled" : "Enabled"} Game Activity`);
  UserSettingStore.setSetting("status", "showCurrentGame", !enabled);
};

export const toggleSpotifyActivity = (account?: {
  type: string;
  id: string;
  name: string;
  showActivity: boolean;
}): void => {
  const { ConnectedAccountsStore, ConnectedAccountsUtils, SoundUtils } = Modules;
  const accounts = account
    ? [account]
    : ConnectedAccountsStore.getAccounts().filter((a) => a.type === "spotify");
  for (const a of accounts) {
    a.showActivity = !a.showActivity;
    ConnectedAccountsUtils.setShowActivity("spotify", a.id, a.showActivity);
  }
  if (
    account
      ? (!account.showActivity &&
          (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyDisable ?? true)) ||
        (account.showActivity &&
          (SettingValues.get("playAudio", defaultSettings.playAudio).spotifyEnable ?? true))
      : SettingValues.get("playAudio", defaultSettings.playAudio).spotifyToogle ?? true
  ) {
    SoundUtils.playSound(
      account
        ? account.showActivity
          ? Sounds.SpotifyEnable
          : Sounds.SpotifyDisable
        : Sounds.SpotifyToogle,
      0.5,
    );
  }
  PluginLogger.log(
    account
      ? account.showActivity
        ? `Enabled Spotify Song Activity for ${account.name}`
        : `Disabled Spotify Song Activity for ${account.name}`
      : `Toogled Spotify Song Activity for ${accounts.map((a) => a.name).join(", ")}`,
  );
};

export const useSetting = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: V;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void;
} => {
  const initial = settings.get(key as K) ?? lodash.get(settings.all(), key) ?? fallback;
  const [value, setValue] = React.useState(initial as V);

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : void 0;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : void 0;
      const targetValue = target && "value" in target ? target.value : void 0;
      const targetChecked = target && "checked" in target ? target.checked : void 0;
      const finalValue = (checked ?? targetChecked ?? targetValue ?? value ?? newValue) as T[K];

      setValue(finalValue as V);

      if (settings.get(key as K)) {
        settings.set(key as K, finalValue);
      } else {
        const [rootKey] = key.split(/[-/.]/);
        const setting = lodash.set(settings.all(), key, finalValue)[rootKey as K];
        settings.set(rootKey as K, setting);
      }
    },
  };
};

export const useSettingArray = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): [V, (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void] => {
  const { value, onChange } = useSetting(settings, key, fallback);

  return [value as V, onChange];
};

export default {
  ...util,
  forceRerenderElement,
  toggleGameActivity,
  toggleSpotifyActivity,
  useSetting,
  useSettingArray,
};
