import { Module } from '@nestjs/common';
import { ChunirecUpdateService } from './chunirec-update.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { SongListModule } from '../song-list/song-list.module';

@Module({
  controllers: [],
  providers: [ChunirecUpdateService],
  imports: [ConfigModule, PrismaModule, SongListModule],
})
export class ChunirecUpdateModule {}
