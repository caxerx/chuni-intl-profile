import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { ChuniRecordSubmitController } from './chuni-record-submit.controller';
import { ChuniRecordController } from './chuni-record.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 150,
    }),
    PrismaModule,
  ],
  controllers: [ChuniRecordController, ChuniRecordSubmitController],
})
export class ChuniRecordModule {}
