import {
  UserSettingsActionTypes,
  UserSettingsProtoStore,
  UserSettingsProtoUtils,
} from "./requiredModules";
import * as Types from "../types";
const { INFREQUENT_USER_ACTION } = UserSettingsActionTypes;
export const getSetting = (category: string, key: string): boolean => {
  if (!category || !key) return;
  return Boolean(UserSettingsProtoStore?.settings?.[category]?.[key]?.value);
};
export const getSettingsStore = (): {
  updateAsync: (
    category: string,
    setter: Types.DefaultTypes.AnyFunction,
    type: string | number,
  ) => void;
} => {
  //i legit don't know what this doing
  return (Object.entries(UserSettingsProtoUtils)?.find?.(
    (n) => n?.[1]?.updateAsync && n?.[1]?.ProtoClass?.typeName?.endsWith(".PreloadedUserSettings"),
  ) || [])[1];
};
export const setSetting = (category: string, key: string, value: boolean): boolean => {
  if (!category || !key) return;
  let store = getSettingsStore();
  if (store)
    store.updateAsync(
      category,
      (settings) => {
        if (!settings) return;
        settings[key].value = value;
      },
      INFREQUENT_USER_ACTION,
    );
};
