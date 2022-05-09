import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  SongCompareDto,
  SongEntryDto,
  SongImportDto,
} from 'src/modules/song-list/song-list.dto';
import { SongDataService } from 'src/shared/song-data.service';
import { SongModeService } from 'src/shared/song-mode.service';
import { compareSongList } from './song-list.util';

@Injectable()
export class SongListService {
  constructor(
    private songData: SongDataService,
    private songMode: SongModeService,
  ) {}

  async importSongList(songImportDto: SongImportDto) {
    const songMode = await this.songMode.songMode({
      id: songImportDto.modeId,
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
