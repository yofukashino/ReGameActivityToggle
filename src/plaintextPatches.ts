export default [
  {
    find: "account panel v2",
    replacements: [
      {
        match: /(n\.d\(t,\{.*:\(\)=>[A-Za-z]+)(\}\);)/,
        replace: `$1,AccountDetails: () => accountDetails$2`,
      },
      {
        match: /([A-Za-z0-9]+)(=function.*\}.*\);.*hoveringOnMute:!1)/,
        replace: `$1, accountDetails; $1 = accountDetails $2`,
      },
    ],
  },
];
