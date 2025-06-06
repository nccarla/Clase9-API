import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

async findByEmail(email: string): Promise<Usuario | null> {
  return this.usuarioRepo.findOneBy({ email });
}

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepo.create(usuario);
    return this.usuarioRepo.save(nuevoUsuario);
  }
}
