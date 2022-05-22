import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { RecordImageController } from './record-image.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PuppeteerModule.forFeature(), ConfigModule],
  controllers: [RecordImageController],
})
export class RecordImageModule {}
