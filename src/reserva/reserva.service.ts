import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Cliente } from '../../src/cliente/cliente.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly repo: Repository<Reserva>,

    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(dto: CreateReservaDto) {
    const { clienteId, fechaInicio, fechaFin } = dto;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la de inicio');
    }

    const cliente = await this.clienteRepo.findOneBy({ id: clienteId });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');

    // Verificar solapamiento de fechas
    const reservaExistente = await this.repo
      .createQueryBuilder('reserva')
      .where('reserva.clienteId = :clienteId', { clienteId })
      .andWhere(
        `(
          (reserva.fechaInicio BETWEEN :inicio AND :fin) OR
          (reserva.fechaFin BETWEEN :inicio AND :fin) OR
          (:inicio BETWEEN reserva.fechaInicio AND reserva.fechaFin)
        )`,
        { inicio: fechaInicio, fin: fechaFin },
      )
      .getOne();

    if (reservaExistente) {
      throw new BadRequestException('El cliente ya tiene una reserva en ese rango de fechas');
    }

    const reserva = this.repo.create({
      cliente,
      fechaInicio,
      fechaFin,
    });

    return this.repo.save(reserva);
  }

  findAll() {
    return this.repo.find();
  }
}
