import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';

@Controller('ordenes')
export class OrdenController {
  constructor(private readonly service: OrdenService) {}

  @Post()
  create(@Body() dto: CreateOrdenDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}