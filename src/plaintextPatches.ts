import * as Types from "./types";

export default [
  {
    find: "isCopiedStreakGodlike",
    replacements: [
      {
        match: /([A-Za-z]\.[A-Za-z]\([A-Za-z],\{default:\(\)=>[A-Za-z]+)(\}\))/,
        replace: `$1,AccountDetails: () => accountDetails$2`,
      },
      {
        match: /var (.*)=(function.*\}.*\);.*hoveringOnMute:!1)/,
        replace: `var $1,accountDetails;$1=accountDetails=$2`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
