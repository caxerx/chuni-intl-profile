import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ChuniRecordModule } from './modules/chuni-record/chuni-record.module';
import { ChunirecUpdateModule } from './modules/chunirec-update/chunirec-update.module';
import { SettingModule } from './modules/setting/setting.module';
import { SongListModule } from './modules/song-list/song-list.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PrismaModule,
    ChuniRecordModule,
    SongListModule,
    SettingModule,
    ChunirecUpdateModule,
  ],
})
export class AppModule {}
