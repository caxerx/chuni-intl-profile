import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Record as ChuniRecord, Prisma } from '@prisma/client';
import Ajv, { Schema } from 'ajv';
import { AppService } from './app.service';
import { FailureResponse, SuccessResponse } from './models/Response';
import { RecordService } from './record.service';

const ajv = new Ajv();

const schema: Schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    score: { type: 'integer' },
    difficulty: { enum: ['BAS', 'ADV', 'EXP', 'MAS', 'ULT'] },
    fullCombo: { enum: ['', 'FC', 'AJ'] },
  },
  required: ['title', 'score', 'difficulty', 'fullCombo'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

@Controller()
@UseGuards(ThrottlerGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly recordService: RecordService,
  ) {}

  @Get('/api/song-data')
  getSongData() {
    return new SuccessResponse<Record<string, unknown>[]>(
      this.appService.getDummySongData(),
    );
  }

  @Get('/api/record/:id')
  async getRecord(@Param('id') id: string) {
    const record = await this.recordService.record({
      id: id,
    });

    if (record) {
      return new SuccessResponse<ChuniRecord>(record);
    }

    throw new NotFoundException(new FailureResponse('Record Not Found', 404));
  }

  @Throttle(3, 60)
  @Post('/submit')
  @Redirect('/', 302)
  async createRecord(@Body() record: { record: string }) {
    const jsonRecord = JSON.parse(record.record) as Prisma.InputJsonArray;

    if (!Array.isArray(jsonRecord) || jsonRecord.length == 0) {
      throw new BadRequestException(new FailureResponse('Invalid Record', 400));
    }

    for (const i of jsonRecord) {
      if (!validate(i)) {
        throw new BadRequestException(
          new FailureResponse('Bad record format', 400),
        );
      }
    }

    const createdRec = await this.recordService.createRecord({
      record: jsonRecord,
    });

    return {
      url: `/${createdRec.id}`,
    };
  }
}
