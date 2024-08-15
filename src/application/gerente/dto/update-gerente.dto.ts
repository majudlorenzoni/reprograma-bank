import { IsOptional, IsString } from 'class-validator';

export class UpdateGerenteDto {
  @IsOptional()
  @IsString()
  nomeCompleto?: string;
}
