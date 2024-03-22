import Types from "./types";

export default [
  {
    find: "isCopiedStreakGodlike",
    replacements: [
      {
        match: /this\.renderNameZone\(\),\(0,.\.\w+\)\([\w_$]+\.\w+,{grow:0,children:\[/,
        replace: `$&replugged.plugins.getExports("dev.tharki.ReGameActivityToggle")?._addPanelButton?.()??null,`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
