import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ChuniRecordModule } from './modules/chuni-record/chuni-record.module';
import { SettingModule } from './modules/setting/setting.module';
import { SongListModule } from './modules/song-list/song-list.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    ChuniRecordModule,
    SongListModule,
    SettingModule,
  ],
})
export class AppModule {}
