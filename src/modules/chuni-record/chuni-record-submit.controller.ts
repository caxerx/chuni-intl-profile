import { Body, Controller, Post, Redirect, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Prisma } from '@prisma/client';
import { RecordSubmitDto } from 'src/dtos/record-submit';
import { RecordService } from '../../shared/record.service';

@Controller()
@UseGuards(ThrottlerGuard)
export class ChuniRecordSubmitController {
  constructor(private readonly recordService: RecordService) {}

  @Throttle(3, 60)
  @Post('/submit')
  @Redirect('/', 302)
  async createRecord(@Body() record: RecordSubmitDto) {
    const createdRec = await this.recordService.createRecord({
      record: record.record as unknown as Prisma.InputJsonArray,
    });

    return {
      url: `/${createdRec.id}`,
    };
  }
}
