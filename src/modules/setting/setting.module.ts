import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SettingService } from 'src/shared/setting.service';
import { SettingController } from './setting.controller';

@Module({
  controllers: [SettingController],
  providers: [PrismaService, SettingService],
})
export class SettingModule {}
