import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectContext } from 'nest-puppeteer';
import type { BrowserContext } from 'puppeteer';
import fs from 'fs/promises';
import { constants } from 'fs';

import { join } from 'path';
import { createReadStream } from 'fs';
import { RecordService } from '../prisma/record.service';

@Controller('/api')
export class RecordImageController {
  constructor(
    @InjectContext() private readonly browserContext: BrowserContext,
    private config: ConfigService,
    private record: RecordService,
  ) {}

  @Get('/record-image/:recordId')
  async getRecordImage(@Param('recordId') recordId: string) {
    const record = await this.record.record({
      id: recordId,
    });

    if (!record) {
      const imgPath = join(process.cwd(), `public/record-404.png`);
      const image = createReadStream(imgPath);
      return new StreamableFile(image, { type: 'image/png' });
    }

    const imgPath = join(
      process.cwd(),
      `public/record-image-cache/${recordId}.png`,
    );
    try {
      await fs.access(imgPath, constants.R_OK);
    } catch {
      const publicUrl = this.config.get('NEXT_PUBLIC_HOST_URL');

      const page = await this.browserContext.newPage();
      page.setViewport({ width: 640, height: 480, deviceScaleFactor: 2 });

      await page.goto(`${publicUrl}/${recordId}?hideMenu=1&recordSize=30`);

      const image = (await page.screenshot({ fullPage: true })) as Buffer;

      await page.close();

      await fs.mkdir(`${process.cwd()}/public/record-image-cache`, {
        recursive: true,
      });

      await fs.writeFile(imgPath, image);
    }

    const image = createReadStream(imgPath);
    return new StreamableFile(image, { type: 'image/png' });
  }
}
