import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SongModeService } from './song-mode.service';
import { SongDataService } from './song-data.service';
import { SettingService } from './setting.service';
import { RecordService } from './record.service';

@Module({
  providers: [
    PrismaService,
    RecordService,
    SettingService,
    SongDataService,
    SongModeService,
  ],
  exports: [
    PrismaService,
    RecordService,
    SettingService,
    SongDataService,
    SongModeService,
  ],
})
export class PrismaModule {}
