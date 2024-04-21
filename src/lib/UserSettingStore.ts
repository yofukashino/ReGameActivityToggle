import { flux as Flux } from "replugged/common";
import Modules from "./requiredModules";
export const getSetting = (category: string, key: string): boolean => {
  if (!category || !key) return;
  return Boolean(Modules.UserSettingsProtoStore?.settings?.[category]?.[key]?.value);
};
export const useSetting = (category: string, key: string): boolean => {
  if (!category || !key) return false;
  const { setting } = Flux.useStateFromStores([Modules.UserSettingsProtoStore], () => {
    return {
      setting: Boolean(Modules.UserSettingsProtoStore?.settings?.[category]?.[key]?.value),
    };
  });
  return setting;
};
export const setSetting = (category: string, key: string, value: boolean): boolean => {
  if (!category || !key) return;
  const { PreloadedUserSettingsActionCreators, UserSettingsDelay } =
    Modules.UserSettingsActionUtils;
  if (PreloadedUserSettingsActionCreators)
    PreloadedUserSettingsActionCreators.updateAsync(
      category,
      (settings) => {
        if (!settings) return;
        settings[key].value = value;
      },
      UserSettingsDelay.INFREQUENT_USER_ACTION,
    );
};

export default { getSetting, useSetting, setSetting };
