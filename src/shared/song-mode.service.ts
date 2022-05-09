import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, SongData, SongMode } from '@prisma/client';

@Injectable()
export class SongModeService {
  constructor(private prisma: PrismaService) {}

  async songMode(
    SongModeWhereUniqueInput: Prisma.SongModeWhereUniqueInput,
  ): Promise<(SongMode & { songDatas: SongData[] }) | null> {
    return this.prisma.songMode.findUnique({
      where: SongModeWhereUniqueInput,
      include: {
        songDatas: true,
      },
    });
  }

  async songModes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SongModeWhereUniqueInput;
    where?: Prisma.SongModeWhereInput;
    orderBy?: Prisma.SongModeOrderByWithRelationInput;
  }): Promise<SongMode[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.songMode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSongMode(data: Prisma.SongModeCreateInput): Promise<SongMode> {
    return this.prisma.songMode.create({
      data,
    });
  }

  async updateSongMode(params: {
    where: Prisma.SongModeWhereUniqueInput;
    data: Prisma.SongModeUpdateInput;
  }): Promise<SongMode> {
    const { where, data } = params;
    return this.prisma.songMode.update({
      data,
      where,
    });
  }

  async deleteSongMode(
    where: Prisma.SongModeWhereUniqueInput,
  ): Promise<SongMode> {
    return this.prisma.songMode.delete({
      where,
    });
  }
}
