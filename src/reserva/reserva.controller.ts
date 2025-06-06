import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly service: ReservaService) {}

  @Post()
  create(@Body() dto: CreateReservaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
