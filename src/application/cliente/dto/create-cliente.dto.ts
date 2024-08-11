import { IsNotEmpty, IsString, IsObject, IsOptional, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nomeCompleto: string;

  @IsObject()
  @Type(() => Object) 
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
  };

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsOptional() 
  @IsString()
  gerenteId?: string;

  @IsNotEmpty()
  @IsDecimal()
  rendaSalarial: number;
}