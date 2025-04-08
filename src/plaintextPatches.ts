import Types from "./types";

export default [
  {
    find: "AccountProfilePopout",
    replacements: [
      {
        match: /\(0,\w+\.jsx\)\((\w+\.\w+),{id:"switch-accounts/,
        replace: (suffix: string, ProfileItem: string) =>
          `replugged.plugins.getExports("dev.tharki.ReGameActivityToggle")?._addProfileItem?.({ProfileItem: ${ProfileItem}}),${suffix}`,
      },
    ],
  },
  {
    find: "isCopiedStreakGodlike",
    replacements: [
      {
        match: /className:.{1,3}\.buttons,style:\w+,children:\[/,
        replace: (prefix) =>
          `${prefix}replugged.plugins.getExports("dev.tharki.ReGameActivityToggle")?._addPanelButton?.()??null,`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
