import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUser(loginDto.email, loginDto.password);
    return { token };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto.email, registerDto.password);
    return { mensaje: 'Usuario registrado' };
  }
}
