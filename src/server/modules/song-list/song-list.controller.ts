import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SongMode } from '@prisma/client';
import { SongEntryDto } from '../../modules/song-list/song-list.dto';
import { SettingService } from '../prisma/setting.service';
import { SongModeService } from '../prisma/song-mode.service';
import {
  FailureResponse,
  SuccessResponse,
} from '../../../shared/models/responses';

@Controller('/api')
@UseGuards(ThrottlerGuard)
export class SongListController {
  constructor(
    private readonly songModeService: SongModeService,
    private readonly settingService: SettingService,
  ) {}

  @Get('/song-lists')
  async getSongLists() {
    const resp = await this.songModeService.songModes({});
    return new SuccessResponse<SongMode[]>(resp);
  }

  @Get('/song-list')
  async getSongList() {
    const defaultSongList = await this.settingService.setting({
      key: 'defaultSongList',
    });

    if (!defaultSongList) {
      throw new InternalServerErrorException(
        new FailureResponse('defaultSongList not set', 500),
      );
    }

    const songMode = await this.songModeService.songMode({
      id: defaultSongList.value,
    });

    if (!songMode) {
      throw new InternalServerErrorException(
        new FailureResponse('defaultSongList set but not found', 500),
      );
    }

    const songList = songMode.songDatas.map(
      (i) => i.data as unknown as SongEntryDto,
    );

    return new SuccessResponse<SongEntryDto[]>(songList);
  }

  @Get('/song-list/:id')
  async getSongListById(@Param('id') id: string) {
    const songMode = await this.songModeService.songMode({
      id: id,
    });

    if (!songMode) {
      throw new NotFoundException(
        new FailureResponse('Song list not found', 404),
      );
    }

    const songList = songMode.songDatas.map(
      (i) => i.data as unknown as SongEntryDto,
    );

    return new SuccessResponse<SongEntryDto[]>(songList);
  }
}
