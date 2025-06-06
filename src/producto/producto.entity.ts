import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';
import { Comentario } from '../comentario/comentario.entity';
import { OneToMany } from 'typeorm';



@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @Column('decimal')
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;

  @Column()
  @IsInt({ message: 'El stock debe ser un número entero' })
  @IsPositive({ message: 'El stock debe ser mayor que 0' })
  stock: number;
  
  @OneToMany(() => Comentario, (comentario) => comentario.producto)
comentarios: Comentario[];
}
