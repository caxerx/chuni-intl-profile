import { Injectable } from '@nestjs/common';
import songData from './dummy-data/song-data.json';

@Injectable()
export class AppService {
  getDummySongData(): Record<string, unknown>[] {
    return songData;
  }
}
