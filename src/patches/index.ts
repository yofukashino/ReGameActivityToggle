import patchAccountContextMenu from "./AccountContextMenu";
import patchAudioResolver from "./AudioResolver";
export const applyInjections = (): void => {
  patchAccountContextMenu();
  void patchAudioResolver();
};

export default { applyInjections };
