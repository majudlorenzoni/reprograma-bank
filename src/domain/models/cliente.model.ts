import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Conta } from '../entities/conta.entity';
import { Gerente } from './gerente.model';

@Injectable()
export class Cliente {
  private id: string;
  public nomeCompleto: string;
  private endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
  };
  private telefone: string;
  public contasAssociadas: Conta[] = [];
  private gerente: Gerente;
  public rendaSalarial: number;

  constructor(
    nomeCompleto: string,
    endereco: {
      rua: string;
      numero: string;
      bairro: string;
      cidade: string;
      cep: string;
      estado: string;
    },
    telefone: string,
    gerente: Gerente,
    contasAssociadas: Conta[] = [],
    rendaSalarial: number,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.id = this.generateUUID();
    this.endereco = endereco;
    this.telefone = telefone;
    this.gerente = gerente;
    this.contasAssociadas = contasAssociadas;
    this.rendaSalarial = rendaSalarial;
  }

  private generateUUID(): string {
    return uuidv4();
  }

  getIdCliente(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
