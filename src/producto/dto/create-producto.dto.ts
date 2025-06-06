import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  nombre: string;

  @IsPositive()
  precio: number;

  @IsInt()
  @IsPositive()
  stock: number;
}