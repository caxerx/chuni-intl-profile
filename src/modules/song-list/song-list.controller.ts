import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SongEntryDto } from 'src/dtos/song-list';
import { SettingService } from 'src/shared/setting.service';
import { SongModeService } from 'src/shared/song-mode.service';
import { FailureResponse, SuccessResponse } from '../../models/responses';

@Controller('/api')
@UseGuards(ThrottlerGuard)
export class SongListController {
  constructor(
    private readonly songModeService: SongModeService,
    private readonly settingService: SettingService,
  ) {}

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