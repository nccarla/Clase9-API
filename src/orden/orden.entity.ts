import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Cliente } from '../../src/cliente/cliente.entity';
import { Producto } from '../producto/producto.entity';
import { ArrayMinSize, IsNumber } from 'class-validator';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @ManyToMany(() => Producto, { eager: true })
  @JoinTable()
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto' })
  productos: Producto[];

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column('decimal')
  @IsNumber({}, { message: 'Monto total inválido' })
  montoTotal: number;
}