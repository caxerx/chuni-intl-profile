import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  SongCompareDto,
  SongEntryDto,
  SongImportDto,
  SongUpdateDto,
} from '../../modules/song-list/song-list.dto';
import { SongDataService } from '../../shared/song-data.service';
import { SongModeService } from '../../shared/song-mode.service';
import { compareSongList } from './song-list.util';

@Injectable()
export class SongListService {
  constructor(
    private songData: SongDataService,
    private songMode: SongModeService,
  ) {}

  async updateSongList(modeId: string, songUpdateDto: SongUpdateDto) {
    const songMode = await this.songMode.songMode({
      id: modeId,
    });

    if (!songMode) {
      throw 'Song mode not found';
    }

    const songModeList = songMode.songDatas.map(
      (i) => i.data as unknown as SongEntryDto,
    );

    const compareList = compareSongList(songModeList, songUpdateDto.songList);

    const addedList = Object.values(compareList.added).map((i) => ({
      chunirecId: i.meta.id,
      songModeId: modeId,
      data: i as unknown as Prisma.InputJsonValue,
    }));

    const createPromise = this.songData.createSongDataBatch(addedList);

    let deletePromise: Promise<number> | null = null;
    if (songUpdateDto.deleteSong) {
      const deletedList = Object.values(compareList.deleted).map(
        (i) => i.meta.id,
      );

      deletePromise = this.songData.deleteSongDataBatch(modeId, deletedList);
    } else {
      compareList.deleted = {};
    }

    const updatedList = Object.values(compareList.updated);
    const updatePromise = this.songData.updateSongDataBatch(
      modeId,
      updatedList,
    );

    await Promise.all([createPromise, deletePromise, updatePromise]);

    return compareList;
  }

  async importSongList(modeId: string, songImportDto: SongImportDto) {
    const songMode = await this.songMode.songMode({
      id: modeId,
    });

    if (!songMode) {
      throw 'Song mode not found';
    }

    const importList = songImportDto.songList.map((songEntry) => ({
      chunirecId: songEntry.meta.id,
      songModeId: songMode.id,
      data: songEntry as unknown as Prisma.InputJsonObject,
    }));

    return this.songData.createSongDataBatch(importList);
  }

  async compareInputSongList(modeId: string, songImportDto: SongCompareDto) {
    const songMode = await this.songMode.songMode({
      id: modeId,
    });

    if (!songMode) {
      throw 'Song mode not found';
    }

    const original = songMode.songDatas.map(
      (i) => i.data as unknown as SongEntryDto,
    );

    const input = songImportDto.songList;

    const diffObj = compareSongList(original, input);

    return diffObj;
  }

  async compareSongList(modeId: string, modeId2: string) {
    const songMode = await this.songMode.songMode({
      id: modeId,
    });

    const songMode2 = await this.songMode.songMode({
      id: modeId2,
    });

    if (!songMode || !songMode2) {
      throw 'Song mode not found';
    }

    const list1 = songMode.songDatas.map(
      (i) => i.data as unknown as SongEntryDto,
    );

    const list2 = songMode2.songDatas.map(
      (i) => i.data as unknown as SongEntryDto,
    );

    const diffObj = compareSongList(list1, list2);

    return diffObj;
  }
}
