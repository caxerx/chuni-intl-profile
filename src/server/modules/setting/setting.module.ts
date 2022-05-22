import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SettingController } from './setting.controller';

@Module({
  controllers: [SettingController],
  imports: [PrismaModule],
})
export class SettingModule {}
