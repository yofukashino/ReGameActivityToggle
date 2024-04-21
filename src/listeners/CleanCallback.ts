import { CurrentlyPressed } from "../index";
import Modules from "../lib/requiredModules";
export default (): void => {
  if (Modules.WindowStore?.isFocused()) CurrentlyPressed.clear();
};
