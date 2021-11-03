# PEP to PEU playlist backup convertor
This is a script for conversion of custom playlist backups for [BeatSaber](https://beatsaber.com/) ([BFBM](https://bmbf.dev/)) from [PlaylistEditorPro](https://playlisteditorpro.com/) format to [PlaylistEditorUltimate](https://playlisteditorultimate.com/) format.

You would need this conversion if you want to retain you custom playlists when upgrading from BeatSaber 1.13 (BFBM 1.13 and PlaylistEditorPro) to newer version of BeatSaber 1.17+ (BFBM 1.14+ and PlaylistEditorUltimate).

## Prerequisities
* [Node.js](https://nodejs.org/)

## Run convertor

> `node ./src/convert.js <path-to-backup-file-for-converion>`

e.g.
> `node ./src/convert.js C:\VR\PlaylistEditorPro\2021-11-01_081358.json`

This will create new file `2021-11-01_081358-PEU.json` in the current working directory with converted backup. This file needs to be moved to folder of _PlaylistEditorUltimate_ and then it can be used to restore backed-up playlists.