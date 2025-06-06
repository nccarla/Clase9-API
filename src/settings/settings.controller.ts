import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getSettings(@Request() req) {
    const user = req.user;
    return {
      message: `Hola, ${user.username}. Bienvenido a tu configuración privada.`,
      userData: user
    };
  }
}
