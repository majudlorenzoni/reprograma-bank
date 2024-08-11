import { IsString, IsObject, IsOptional, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  nomeCompleto?: string;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  endereco?: {
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
    estado?: string;
  };

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  gerenteId?: string;

  @IsOptional()
  @IsDecimal()
  rendaSalarial?: number;
}
