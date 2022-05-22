import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SongListSettingController } from './song-list-setting.controller';
import { SongListController } from './song-list.controller';
import { SongListService } from './song-list.service';

@Module({
  controllers: [SongListController, SongListSettingController],
  providers: [SongListService],
  exports: [SongListService],
  imports: [PrismaModule],
})
export class SongListModule {}
