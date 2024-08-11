import { Conta } from '../entities/conta.entity';
import { Cliente } from './cliente.model';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ContaPoupanca extends Conta {
  constructor(
    cliente: Cliente,
    agencia: string,
    numero: string,
    saldo: number,
    tipoConta: string,
    taxaJuros: number,
  ) {
    super(cliente, agencia, numero, saldo, tipoConta, undefined, taxaJuros);
  }
}
