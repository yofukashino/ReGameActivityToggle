import { patchPanelButton } from "./AccountDetails";
import { patchStatusPicker } from "./Menu";
export const applyInjections = (): void => {
  patchPanelButton();
  patchStatusPicker();
};
