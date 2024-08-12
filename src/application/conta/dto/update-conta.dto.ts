import { IsOptional, IsString, IsNumber, IsDecimal } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  agencia?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsDecimal()
  saldo?: number;

  @IsOptional()
  @IsString()
  tipoConta?: string;

  @IsOptional()
  @IsDecimal()
  limite?: number;

  @IsOptional()
  @IsDecimal()
  taxaJuros?: number;
}
