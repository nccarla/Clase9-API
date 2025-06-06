import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repo: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto) {
    const clienteExistente = await this.repo.findOne({ where: { email: dto.email } });
    if (clienteExistente) {
      throw new Error('El email ya está registrado');
    }
    const cliente = this.repo.create(dto);
    return this.repo.save(cliente);
  }

  findAll() {
    return this.repo.find();
  }
}