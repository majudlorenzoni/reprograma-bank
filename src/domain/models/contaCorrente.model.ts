import { Conta } from '../entities/conta.entity';
import { Cliente } from './cliente.model';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ContaCorrente extends Conta {
  public limiteChequeEspecial: number;

  constructor(
    cliente: Cliente,
    agencia: string,
    numero: string,
    saldo: number,
    tipoConta: string,
    limiteChequeEspecial: number,
  ) {
    super(cliente, agencia, numero, saldo, tipoConta);
    this.limiteChequeEspecial = limiteChequeEspecial;
  }

  usarChequeEspecial(valor: number): boolean {
    if (this.saldo + this.limiteChequeEspecial >= valor) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }
}
