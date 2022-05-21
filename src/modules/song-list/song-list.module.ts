import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { SettingService } from '../../shared/setting.service';
import { SongDataService } from '../../shared/song-data.service';
import { SongModeService } from '../../shared/song-mode.service';
import { SongListSettingController } from './song-list-setting.controller';
import { SongListController } from './song-list.controller';
import { SongListService } from './song-list.service';

@Module({
  controllers: [SongListController, SongListSettingController],
  providers: [
    PrismaService,
    SongDataService,
    SongModeService,
    SongListService,
    SettingService,
  ],
})
export class SongListModule {}
