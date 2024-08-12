import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal } from 'class-validator';

export class CreateContaDto {
  @IsNotEmpty()
  @IsString()
  agencia: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsDecimal()
  saldo: number;

  @IsNotEmpty()
  @IsString()
  tipoConta: string;

  @IsOptional()
  @IsDecimal()
  limite?:  number | null;

  @IsOptional()
  @IsDecimal()
  taxaJuros?:  number | null;
}
