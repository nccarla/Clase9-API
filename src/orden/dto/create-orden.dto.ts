import { IsArray, ArrayMinSize, IsNumber, IsInt, IsPositive } from 'class-validator';

export class CreateOrdenDto {
  @IsInt()
  @IsPositive()
  clienteId: number;

  @IsArray()
  @ArrayMinSize(1)
  productoIds: number[];

  @IsNumber()
  @IsPositive()
  montoTotal: number;
}
