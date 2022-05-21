import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, SongData } from '@prisma/client';
import { SongEntryDto } from '../modules/song-list/song-list.dto';

@Injectable()
export class SongDataService {
  constructor(private prisma: PrismaService) {}

  async songData(
    songDataWhereUniqueInput: Prisma.SongDataWhereUniqueInput,
  ): Promise<SongData | null> {
    return this.prisma.songData.findUnique({
      where: songDataWhereUniqueInput,
    });
  }

  async songDatas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SongDataWhereUniqueInput;
    where?: Prisma.SongDataWhereInput;
    orderBy?: Prisma.SongDataOrderByWithRelationInput;
  }): Promise<SongData[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.songData.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSongData(data: Prisma.SongDataCreateInput): Promise<SongData> {
    return this.prisma.songData.create({
      data,
    });
  }

  async createSongDataBatch(
    data: Prisma.SongDataCreateManyInput[],
  ): Promise<number> {
    const resp = await this.prisma.songData.createMany({
      data,
    });
    return resp.count;
  }

  async updateSongData(params: {
    where: Prisma.SongDataWhereUniqueInput;
    data: Prisma.SongDataUpdateInput;
  }): Promise<SongData> {
    const { where, data } = params;
    return this.prisma.songData.update({
      data,
      where,
    });
  }

  async deleteSongData(
    where: Prisma.SongDataWhereUniqueInput,
  ): Promise<SongData> {
    return this.prisma.songData.delete({
      where,
    });
  }

  async deleteSongDataBatch(
    songModeId: string,
    chunirecIds: string[],
  ): Promise<number> {
    const resp = await this.prisma.songData.deleteMany({
      where: {
        songModeId: songModeId,
        chunirecId: {
          in: chunirecIds,
        },
      },
    });
    return resp.count;
  }

  async updateSongDataBatch(songModeId: string, songs: SongEntryDto[]) {
    const resp = await this.prisma.$transaction(
      songs.map((i) =>
        this.prisma.songData.update({
          where: {
            chunirecId_songModeId: {
              chunirecId: i.meta.id,
              songModeId,
            },
          },
          data: {
            chunirecId: i.meta.id,
            songModeId: songModeId,
            data: i as unknown as Prisma.InputJsonValue,
          },
        }),
      ),
    );
    return resp;
  }
}
