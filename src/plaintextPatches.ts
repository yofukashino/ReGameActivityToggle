import Types from "./types";

export default [
  {
    find: "isCopiedStreakGodlike",
    replacements: [
      {
        match: /className:\w+\.buttons,children:\[/,
        replace: (prefix) =>
          `${prefix}replugged.plugins.getExports("dev.tharki.ReGameActivityToggle")?._addPanelButton?.()??null,`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
