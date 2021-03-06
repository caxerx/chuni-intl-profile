import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  SongCompareDto,
  SongImportDto,
  SongModeDto,
  SongUpdateDto,
} from '../../modules/song-list/song-list.dto';
import { JsonDiffResult } from '../../modules/song-list/song-list-json-diff.type';
import { SongModeService } from '../prisma/song-mode.service';
import {
  FailureResponse,
  SuccessResponse,
} from '../../../shared/models/responses';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SongListService } from './song-list.service';

@UseGuards(JwtAuthGuard)
@Controller('/api')
export class SongListSettingController {
  constructor(
    private readonly songListService: SongListService,
    private readonly songModeService: SongModeService,
  ) {}

  @Post('/song-mode')
  async createSongMode(@Body() songModeDto: SongModeDto) {
    const resp = await this.songModeService.createSongMode(songModeDto);
    return new SuccessResponse<string>(resp.id);
  }

  @Put('/song-list/:id')
  async createSongData(
    @Param('id') modeId: string,
    @Body() importSongDto: SongImportDto,
  ) {
    try {
      const resp = await this.songListService.importSongList(
        modeId,
        importSongDto,
      );

      return new SuccessResponse<number>(resp);
    } catch (e) {
      if (typeof e === 'string')
        throw new BadRequestException(new FailureResponse(e, 400));
      throw e;
    }
  }

  @Patch('/song-list/:id')
  async updateSongData(
    @Param('id') modeId: string,
    @Body() importSongDto: SongUpdateDto,
  ) {
    try {
      const resp = await this.songListService.updateSongList(
        modeId,
        importSongDto,
      );
      return new SuccessResponse<JsonDiffResult>(resp);
    } catch (e) {
      if (typeof e === 'string')
        throw new BadRequestException(new FailureResponse(e, 400));
      throw e;
    }
  }

  @Post('/song-mode/:id/compare')
  @HttpCode(200)
  async compareSongModeWithList(
    @Param('id') id: string,
    @Body() songCompareDto: SongCompareDto,
  ) {
    const resp = await this.songListService.compareInputSongList(
      id,
      songCompareDto,
    );
    return new SuccessResponse<JsonDiffResult>(resp);
  }

  @Post('/song-mode/:id/compare/:id2')
  @HttpCode(200)
  async compareSongMode(@Param('id') id: string, @Param('id2') id2: string) {
    const resp = await this.songListService.compareSongList(id, id2);
    return new SuccessResponse<JsonDiffResult>(resp);
  }
}
