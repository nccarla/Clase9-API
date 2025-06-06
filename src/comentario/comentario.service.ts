import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './comentario.entity';
import { Repository } from 'typeorm';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { Producto } from '../../src/producto/producto.entity';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly repo: Repository<Comentario>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateComentarioDto) {
    const producto = await this.productoRepo.findOneBy({ id: dto.productoId });
    if (!producto) {
      throw new BadRequestException('Producto no encontrado');
    }

    const comentario = this.repo.create({
      texto: dto.texto,
      puntaje: dto.puntaje,
      producto,
    });

    return this.repo.save(comentario);
  }

  findAll() {
    return this.repo.find();
  }
}
