import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { ChuniRecordModule } from './modules/chuni-record/chuni-record.module';
import { ChunirecUpdateModule } from './modules/chunirec-update/chunirec-update.module';
import { SettingModule } from './modules/setting/setting.module';
import { SongListModule } from './modules/song-list/song-list.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { RecordImageModule } from './modules/record-image/record-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PrismaModule,
    ChuniRecordModule,
    SongListModule,
    SettingModule,
    ChunirecUpdateModule,
    RecordImageModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.MODE === 'DEV',
      }),
      { viewsDir: null, passthrough404: true },
    ),
    PuppeteerModule.forRoot({
      executablePath:
        process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'true'
          ? process.env.CHROMIUM_EXECUTABLE
          : undefined,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
