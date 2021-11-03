// @ts-check
const fs = require("fs");
const path = require("path");

/**
 * @param {OldPlaylist} playlist
 * @returns {NewPlaylist}
 */
function convertPlaylist({ PlaylistID, PlaylistName, SongList }) {
  /**
   * Built-in playlists are no longer managed by BMBF and PEU so filter them out
   */
  const songs = SongList.filter(({ SongID }) =>
    SongID.startsWith("custom_level")
  ).map(convertSong);

  if (!songs.length) return null;

  return {
    IsSaved: false, // always false?
    PlaylistId: PlaylistID,
    PlaylistName,
    Path: "xx", // TODO: Playlist from BMBF has null, playlist from PEU has "xx"
    SongList: songs,
  };
}

/**
 * @param {OldPlaylistSong} song
 * @returns {NewPlaylistSong}
 */
function convertSong({
  SongName,
  SongSubName,
  SongAuthorName,
  LevelAuthorName,
  SongID,
}) {
  /** @type {NewPlaylistSong} */
  const newSong = {
    SongName,
    SongSubName,
    SongAuthorName,
    LevelAuthorName,
    CoverImageFilename: "", // TODO: Cover image wasn't in the old backup data - do we need it?
    Hash: SongID.substr(SongID.lastIndexOf("_") + 1).toUpperCase(), // get hash from old SongID (e.g. custom_level_ce01b25d6c863d8eb9217b0d877a9156bc9ad94f)
    Path: `/sdcard/ModData/com.beatgames.beatsaber/Mods/SongLoader/CustomLevels/${SongID}`,
  };

  knownSongs[newSong.Path] = newSong;

  return newSong;
}

const args = process.argv.slice(2);
if (args.length < 1)
    throw new Error("Path to the old backup json file must be passed as an argument");

const oldBackupFilePath = args[0];
if (!fs.existsSync(oldBackupFilePath)) 
    throw new Error(`File '${oldBackupFilePath}' doesn't exist`);

const oldFileContent = fs.readFileSync(oldBackupFilePath, "utf-8").replace(/^\uFEFF/gm, "");;

/** @type {OldJson} */
const oldData = JSON.parse(oldFileContent);

/** @type {KnownSongs} */
const knownSongs = {};

const newCoreMods = require("./core-mods.json");

/** @type {NewJson} */
const newData = {
  ...oldData,
  Config: {
    PlaylistsPath: "/sdcard/BMBFData/Playlists",
    ModsPath: "/sdcard/BMBFData/Mods/",
    Playlists: oldData.Config.Playlists.map(convertPlaylist).filter(Boolean), // convert playlists and remove empty ones
    Mods: newCoreMods,
    KnownSongs: knownSongs,
  },
  BeatSaberVersion: "1.17.1",
  runForeground: false,
  ignoreNightlyPrompt: false,
};

const backupFileName = path.basename(oldBackupFilePath, ".json");

fs.writeFileSync(`./${backupFileName}-PEU.json`, JSON.stringify(newData, undefined, 4));
