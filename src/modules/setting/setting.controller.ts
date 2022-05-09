import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Setting } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateSettingDto, UpdateSettingDto } from 'src/dtos/setting';
import { SettingService } from 'src/shared/setting.service';
import { FailureResponse, SuccessResponse } from '../../models/responses';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('/settings')
  async getAllSettings() {
    const settingList = await this.settingService.settings({});
    return new SuccessResponse<Setting[]>(settingList);
  }

  @Post('/setting')
  async createSetting(@Body() settingDto: CreateSettingDto) {
    try {
      const createdSetting = await this.settingService.createSetting(
        settingDto,
      );
      return new SuccessResponse<string>(createdSetting.key);
    } catch (e) {
      console.error(e);

      if (e instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(
          new FailureResponse(e.code, 500),
        );
      }

      throw new InternalServerErrorException(
        new FailureResponse('Unknown Error', 500),
      );
    }
  }

  @Put('/setting/:key')
  async updateSetting(
    @Param('key') key: string,
    @Body() settingDto: UpdateSettingDto,
  ) {
    const createdSetting = await this.settingService.updateSetting({
      where: {
        key,
      },
      data: settingDto,
    });
    return new SuccessResponse<string>(createdSetting.key);
  }
}
