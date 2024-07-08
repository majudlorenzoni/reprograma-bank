import { Conta } from './conta';
import { Cliente } from './cliente';

export class ContaCorrente extends Conta {
  private chequeEspecial: number;

  constructor(cliente: Cliente, agencia: string, numero:string, saldo: number, tipoConta: string, chequeEspecial: number) {
    super(cliente, agencia, numero, saldo, tipoConta);
    this.chequeEspecial = chequeEspecial;
  }

  sacar(valor: number): void {
    const limiteTotal = this.saldo + this.chequeEspecial;
    if (valor <= limiteTotal) {
      if (valor <= this.saldo) {
        this.saldo -= valor;
      } else {
        const valorDoChequeEspecial = valor - this.saldo;
        this.saldo = 0;
        this.chequeEspecial -= valorDoChequeEspecial;
        console.log(`Utilizado cheque especial de ${valorDoChequeEspecial}. Novo saldo do cheque especial: ${this.chequeEspecial}`);
      }
      console.log(`Sacado ${valor} da conta corrente ${this.numero}. Novo saldo: ${this.saldo}`);
    } else {
      console.log(`Limite de saldo + cheque especial ultrapassado na conta corrente ${this.numero}.`);
    }
  }
}
