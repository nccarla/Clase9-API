import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('productos')
export class ProductoController {
  constructor(private readonly service: ProductoService) {}

  @UseGuards(JwtAuthGuard) // Ruta privada: protegida por JWT
  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.service.create(dto);
  }

  @Get() // Ruta pública: sin guard
  findAll() {
    return this.service.findAll();
  }
}
