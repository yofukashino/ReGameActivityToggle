import {
  UserSettingsActionTypes,
  UserSettingsProtoStore,
  UserSettingsProtoUtils,
} from "./requiredModules.jsx";
import * as Utils from "./utils.jsx";
export const getSetting = (category, key) => {
  if (!category || !key) return;
  return UserSettingsProtoStore?.settings?.[category]?.[key]?.value;
};
export const getSettingsStore = () => {
  return (Object.entries(UserSettingsProtoUtils)?.find?.(
    (n) => n?.[1]?.updateAsync && n?.[1]?.ProtoClass?.typeName?.endsWith(".PreloadedUserSettings"),
  ) || [])[1];
};
export const setSetting = (category, key, value) => {
  if (!category || !key) return;
  let store = getSettingsStore();
  if (store)
    store.updateAsync(
      category,
      (settings) => {
        if (!settings) return;
        if (!settings[key]) settings[key] = {};
        if (Utils.isObject(value)) for (const k in value) settings[key][k] = value[k];
        else settings[key].value = value;
      },
      UserSettingsActionTypes.INFREQUENT_USER_ACTION,
    );
};
