import { diff } from 'deep-object-diff';
import { JsonDiffResult } from '../../modules/song-list/song-list-json-diff.type';
import { isDeepStrictEqual } from 'util';
import { SongEntryDto } from './song-list.dto';

export function compareSongList(
  originalSongData: SongEntryDto[],
  newSongData: SongEntryDto[],
) {
  const diffObj: JsonDiffResult<SongEntryDto> = {
    added: {},
    deleted: {},
    updated: {},
    updatedDiff: {},
  };

  const originalSongMap = new Map();

  originalSongData.forEach((i) => {
    originalSongMap.set(i.meta.id, i);
  });

  const newSongMap = new Map();

  newSongData.forEach((i) => {
    newSongMap.set(i.meta.id, i);
  });

  const allSongId = new Set([...originalSongMap.keys(), ...newSongMap.keys()]);

  allSongId.forEach((i) => {
    const originListSong = originalSongMap.get(i);
    const newListSong = newSongMap.get(i);

    if (!originListSong) {
      return (diffObj.added[i] = newListSong);
    }

    if (!newListSong) {
      return (diffObj.deleted[i] = originListSong);
    }

    const diffResp = diff(originListSong, newListSong) as Partial<SongEntryDto>;

    if (!isDeepStrictEqual(diffResp, {})) {
      diffObj.updated[i] = newListSong;
      diffObj.updatedDiff[i] = diffResp;
    }
  });

  return diffObj;
}
