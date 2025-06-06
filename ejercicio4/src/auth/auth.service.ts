import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}  

  async validateUser(email: string, password: string): Promise<string> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id, email: usuario.email };
    return this.jwtService.sign(payload);
  }

  async register(email: string, password: string) {
    const existe = await this.usuarioService.findByEmail(email);
    if (existe) {
      throw new BadRequestException('El email ya está registrado');
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    await this.usuarioService.create({
      email,
      password: passwordHashed,
    });
  }
}