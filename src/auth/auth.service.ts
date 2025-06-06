import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // ⚠️ Aquí simulamos un usuario hardcoded
  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'admin' && password === '1234') {
      return { userId: 1, username: 'admin' };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
