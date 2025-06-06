import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  @MaxLength(200)
  texto: string;

  @IsInt()
  @Min(1)
  @Max(5)
  puntaje: number;

  @IsInt()
  productoId: number;
}
