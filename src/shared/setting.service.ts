import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Setting } from '@prisma/client';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async setting(
    settingWhereUniqueInput: Prisma.SettingWhereUniqueInput,
  ): Promise<Setting | null> {
    return this.prisma.setting.findUnique({
      where: settingWhereUniqueInput,
    });
  }

  async settings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SettingWhereUniqueInput;
    where?: Prisma.SettingWhereInput;
    orderBy?: Prisma.SettingOrderByWithRelationInput;
  }): Promise<Setting[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.setting.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSetting(data: Prisma.SettingCreateInput): Promise<Setting> {
    return this.prisma.setting.create({
      data,
    });
  }

  async createSettingBatch(
    data: Prisma.SettingCreateManyInput[],
  ): Promise<number> {
    const resp = await this.prisma.setting.createMany({
      data,
    });
    return resp.count;
  }

  async updateSetting(params: {
    where: Prisma.SettingWhereUniqueInput;
    data: Prisma.SettingUpdateInput;
  }): Promise<Setting> {
    const { where, data } = params;
    return this.prisma.setting.update({
      data,
      where,
    });
  }

  async deleteSetting(where: Prisma.SettingWhereUniqueInput): Promise<Setting> {
    return this.prisma.setting.delete({
      where,
    });
  }
}
