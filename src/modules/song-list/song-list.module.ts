import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SettingService } from 'src/shared/setting.service';
import { SongDataService } from 'src/shared/song-data.service';
import { SongModeService } from 'src/shared/song-mode.service';
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
