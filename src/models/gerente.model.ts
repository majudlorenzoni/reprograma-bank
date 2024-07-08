import * as crypto from 'crypto';
import { Cliente } from './cliente.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Gerente {
  public nomeCompleto: string;
  private idGerente: string;
  public clientes: Cliente[] = [];

  constructor(nomeCompleto: string) {
    this.nomeCompleto = nomeCompleto;
    this.idGerente = crypto.randomUUID();
  }

  getId(): string {
    return this.idGerente;
  }
}
