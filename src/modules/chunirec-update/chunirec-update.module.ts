import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { ChunirecUpdateService } from './chunirec-update.service';
import { SongListService } from '../song-list/song-list.service';
import { SongModeService } from '../../shared/song-mode.service';
import { SongDataService } from '../../shared/song-data.service';
import { ConfigModule } from '@nestjs/config';
import { SettingService } from '../../shared/setting.service';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    ChunirecUpdateService,
    SettingService,
    SongDataService,
    SongModeService,
    SongListService,
  ],
  imports: [ConfigModule],
})
export class ChunirecUpdateModule {}
