import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LoginDto } from 'src/modules/auth/auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Throttle(3, 120)
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.password);
    if (user) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException();
  }
}
