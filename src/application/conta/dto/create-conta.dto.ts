import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal } from 'class-validator';

export class CreateAccountDto {
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
  limite?: number;

  @IsOptional()
  @IsDecimal()
  taxaJuros?: number;
}
