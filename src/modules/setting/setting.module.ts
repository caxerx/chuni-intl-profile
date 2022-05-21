import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { SettingService } from '../../shared/setting.service';
import { SettingController } from './setting.controller';

@Module({
  controllers: [SettingController],
  providers: [PrismaService, SettingService],
})
export class SettingModule {}
