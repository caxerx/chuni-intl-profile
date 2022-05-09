import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaService } from 'src/shared/prisma.service';
import { RecordService } from 'src/shared/record.service';
import { ChuniRecordSubmitController } from './chuni-record-submit.controller';
import { ChuniRecordController } from './chuni-record.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 150,
    }),
  ],
  controllers: [ChuniRecordController, ChuniRecordSubmitController],
  providers: [PrismaService, RecordService],
})
export class ChuniRecordModule {}
