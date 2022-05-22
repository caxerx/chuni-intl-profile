import {
  Controller,
  Get,
  Render,
  Res,
  Param,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { RenderableResponse } from 'nest-next';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  Home() {
    return {};
  }

  @Get('favicon.ico')
  public async favicon() {
    const file = createReadStream(join(process.cwd(), 'public/favicon.ico'));
    return new StreamableFile(file, { type: 'image/png' });
  }

  @Get(':recordId')
  public index(
    @Param('recordId') recordId: string,
    @Res() res: RenderableResponse,
    @Query() query,
  ) {
    res.render(recordId, query);
  }
}
