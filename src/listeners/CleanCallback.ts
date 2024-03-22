import { CurrentlyPressed } from "../index";
import { WindowStore } from "../lib/requiredModules";
export default (): void => {
  if (WindowStore.isFocused()) CurrentlyPressed.clear();
};
