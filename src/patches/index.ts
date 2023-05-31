import { patchStatusPicker } from "./Menu";
export { addPanelButton } from "./AccountDetails";
export const applyInjections = (): void => {
  patchStatusPicker();
};
