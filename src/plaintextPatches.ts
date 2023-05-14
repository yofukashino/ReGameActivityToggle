import * as Types from "./types";

export default [
  {
    find: "isCopiedStreakGodlike",
    replacements: [
      {
        match: /([\w$]+\.[\w$]+\([\w$]+,\{default:\(\)=>[\w$]+)(\}\))/,
        replace: `$1,AccountDetails: () => accountDetails$2`,
      },
      {
        match:
          /(?=[^]*var [\w$]+,accountDetails;[\w$]+=accountDetails=function[^]*?hoveringOnMute:!1};)|([^]*)var ([\w$]+)=(function[^]*?hoveringOnMute:!1};)/,
        replace: (entireOrig: string, prefix: string, varName: string, suffix: string) => {
          if (!prefix || !varName || !suffix) return `${entireOrig}`;
          return `${prefix}var ${varName},accountDetails;${varName}=accountDetails=${suffix}`;
        },
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
