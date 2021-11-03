type OldJson = {
  IsCommitted: boolean;
  Config: {
    Playlists: OldPlaylist[];
    Mods: OldMod[];
    Saber: null;
    LeftColor: null;
    RightColor: null;
    TextChanges: [];
  };
  SyncConfig: SyncConfig;
  BeatSaberVersion: string;
};

type OldPlaylist = {
  PlaylistID: string;
  PlaylistName: string;
  SongList: OldPlaylistSong[];
  CoverImageBytes: null;
  IsCoverLoaded: false;
};

type OldPlaylistSong = {
  SongID: string;
  SongName: string;
  SongSubName: string;
  SongAuthorName: string;
  LevelAuthorName: string;
  CustomSongPath: string | null;
};

type OldMod = unknown;

type SyncConfig = unknown;

// ----------------------------------
type NewJson = {
  runForeground: boolean;
  IsCommitted: boolean;
  Config: {
    PlaylistsPath: "/sdcard/BMBFData/Playlists";
    ModsPath: "/sdcard/BMBFData/Mods/";
    Playlists: NewPlaylist[];
    Mods: NewMod[];
    KnownSongs: KnownSongs;
  };
  SyncConfig: SyncConfig;
  BeatSaberVersion: string;
  ignoreNightlyPrompt: boolean;
};

type NewPlaylist = {
  PlaylistId: string;
  PlaylistName: string;
  Path: string;
  IsSaved: boolean;
  SongList: NewPlaylistSong[];
};

type NewPlaylistSong = {
  CoverImageFilename: string;
  Hash: string;
  SongName: string;
  SongSubName: string;
  SongAuthorName: string;
  LevelAuthorName: string;
  Path: NewSongPath;
};

type NewSongPath = string;

type NewMod = unknown;

type KnownSongs = Record<NewSongPath, NewPlaylistSong>;
