import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Record as ChuniRecord } from '@prisma/client';
import { FailureResponse, SuccessResponse } from '../../models/responses';
import { RecordService } from '../../shared/record.service';

@Controller('/api')
@UseGuards(ThrottlerGuard)
export class ChuniRecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('/record/:id')
  async getRecord(@Param('id') id: string) {
    const record = await this.recordService.record({
      id: id,
    });

    if (record) {
      return new SuccessResponse<ChuniRecord>(record);
    }

    throw new NotFoundException(new FailureResponse('Record Not Found', 404));
  }
}
