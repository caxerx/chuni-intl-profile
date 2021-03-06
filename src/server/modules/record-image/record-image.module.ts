import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { RecordImageController } from './record-image.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PuppeteerModule.forFeature(), ConfigModule, PrismaModule],
  controllers: [RecordImageController],
})
export class RecordImageModule {}
