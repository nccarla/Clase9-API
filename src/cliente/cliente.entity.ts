import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['email'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @Column()
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;
}