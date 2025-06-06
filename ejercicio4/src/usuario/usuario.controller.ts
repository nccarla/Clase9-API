import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  getProfile(@Request() req) {
    console.log('Usuario autenticado:', req.user);
    return {
      mensaje: 'Ruta protegida',
      usuario: req.user,
    };
}

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const usuario = await this.usuarioService.findByEmail(email);
    return usuario;
  }
}
