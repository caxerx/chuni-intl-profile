import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SongListService } from '../song-list/song-list.service';
import { SettingService } from '../../shared/setting.service';
import { ConfigService } from '@nestjs/config';
import { SongEntryDto } from '../song-list/song-list.dto';
import fetch from 'node-fetch';

@Injectable()
export class ChunirecUpdateService {
  constructor(
    private songList: SongListService,
    private setting: SettingService,
    private config: ConfigService,
  ) {}

  logger = new Logger(ChunirecUpdateService.name);

  @Cron('0 14,23 * * *')
  async handleChunirecUpdate() {
    const chunirecSongList = await this.setting.setting({
      key: 'chunirecSongList',
    });

    if (!chunirecSongList) {
      return this.logger.error(
        'Setting "chunirecSongList" not found. Auto Chunirec update failed!',
      );
    }

    const token = this.config.get('CHUNIREC_TOKEN');
    if (!token) {
      return this.logger.error(
        'Config "CHUNIREC_TOKEN" not found. Auto Chunirec update failed!',
      );
    }

    try {
      const chunirec = await fetch(
        `https://api.chunirec.net/2.0/music/showall.json?region=jp2&token=${token}`,
      ).then((r) => r.json());

      const resp = await this.songList.updateSongList(chunirecSongList.value, {
        deleteSong: true,
        songList: chunirec as SongEntryDto[],
      });

      this.logger.log('Chunirec update success:');
      this.logger.log(resp);
    } catch (e) {
      this.logger.error('Failed to auto update Chunirec');
      this.logger.error(e);
    }
  }
}
