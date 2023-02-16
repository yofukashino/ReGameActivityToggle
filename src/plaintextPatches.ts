import * as Types from "./types";

export default [
  {
    find: "account panel v2",
    replacements: [
      {
        match: /([A-Za-z]\.[A-Za-z]\([A-Za-z],\{[A-Za-z]+:\(\)=>[A-Za-z]+)(\}\);)/,
        replace: `$1,AccountDetails: () => accountDetails$2`,
      },
      {
        match: /var ([A-Za-z0-9]+)=(function.*\}.*\);.*hoveringOnMute:!1)/,
        replace: `var $1,accountDetails;$1=accountDetails=$2`,
      },
    ],
  },
  {
    find: "Menu API only allows Items and groups of Items as children",
    replacements: [
      {
        match: /(function Se\(\)\{)(return\(\d,[A-Za-z]\.jsx\)\("div")/gm,
        replace: `$1 console.log("gg");$2`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
