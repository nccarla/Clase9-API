import { Controller, Post, Body, Get } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly service: ComentarioService) {}

  @Post()
  create(@Body() dto: CreateComentarioDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
