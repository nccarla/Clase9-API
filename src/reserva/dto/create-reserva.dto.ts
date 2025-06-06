import {
  IsDateString,
  IsNotEmpty,
  ValidateIf,
  Validate,
} from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  clienteId: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}
