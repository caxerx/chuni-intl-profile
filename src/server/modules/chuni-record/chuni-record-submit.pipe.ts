import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { RecordSubmitDto } from '../../modules/chuni-record/chuni-record-submit.dto';

@Injectable()
export class ChuniRecordSubmitPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      metadata.metatype === RecordSubmitDto &&
      typeof value?.record === 'string'
    ) {
      return { record: JSON.parse(value?.record ?? '[]') };
    }
    return value;
  }
}
