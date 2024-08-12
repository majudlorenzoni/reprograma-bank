import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGerenteDto {
  @IsNotEmpty()
  @IsString()
  nomeCompleto: string;
}
