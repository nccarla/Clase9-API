
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Producto } from '../producto/producto.entity';

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  texto: string;

  @Column({ type: 'int' })
  puntaje: number;

  @ManyToOne(() => Producto, (producto) => producto.comentarios, { eager: true })
  producto: Producto;
}
