import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.type';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(pass: string): Promise<User | null> {
    if (pass === process.env.ADMIN_KEY) {
      return {
        userId: '0',
        username: 'Admin',
      };
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
