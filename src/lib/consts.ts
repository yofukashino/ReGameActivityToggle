import { KeybindUtils } from "./requiredModules";
import GameEnable from "../assets/ga_enable.mp3";
import GameDisable from "../assets/ga_disable.mp3";
import SpotifyEnable from "../assets/sp_enable.mp3";
import SpotifyDisable from "../assets/sp_disable.mp3";
import SpotifyToogle from "../assets/fd_toogle.mp3";
export const defaultSettings = {
  spotify: true,
  statusPicker: true,
  userPanel: true,
  showToast: true,
  keybind: KeybindUtils.toCombo("ctrl+shift+g") as number[][],
  playAudio: {
    gameDisable: true,
    gameEnable: true,
    spotifyDisable: true,
    spotifyEnable: true,
    spotifyToogle: true,
  },
};
export const Sounds = {
  GameEnable: "game_enable",
  GameEnableURL: GameEnable,
  GameDisable: "game_disable",
  GameDisableURL: GameDisable,
  SpotifyEnable: "spotify_enable",
  SpotifyEnableURL: SpotifyEnable,
  SpotifyDisable: "spotify_disable",
  SpotifyDisableURL: SpotifyDisable,
  SpotifyToogle: "spotify_toogle",
  SpotifyToogleURL: SpotifyToogle,
};
