import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orden } from './orden.entity';
import { Repository } from 'typeorm';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { Cliente } from '../../src/cliente/cliente.entity';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden) private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(Cliente) private readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateOrdenDto) {
    const cliente = await this.clienteRepo.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const productos = await this.productoRepo.findByIds(dto.productoIds);
    if (productos.length < 1) throw new Error('Debe agregar al menos un producto');

    const orden = this.ordenRepo.create({
      cliente,
      productos,
      montoTotal: dto.montoTotal,
    });

    return this.ordenRepo.save(orden);
  }

  findAll() {
    return this.ordenRepo.find();
  }
}