import { Conta } from './conta';
import { Cliente } from './cliente';

export class ContaPoupanca extends Conta {
  private taxaJuros: number; // Taxa de juros em percentual (ex: 0.5 para 0.5%)

  constructor(cliente: Cliente, agencia: string, numero: string, saldo: number, tipoConta: string, taxaJuros: number) {
    super(cliente,agencia, numero, saldo, tipoConta);
    this.taxaJuros = taxaJuros;
  }

  calcularTaxa(): number {
    return this.saldo * (this.taxaJuros / 100);
  }

  transferir(destino: Conta, valor: number): void {
    if (valor > 0 && this.saldo >= valor) {
      this.sacar(valor);
      destino.depositar(valor);
      console.log(`Transferência de R$ ${valor.toFixed(2)} realizada da conta poupança ${this.numero} para a conta ${destino.numero}.`);
    } else {
      console.log(`Transferência não realizada. Saldo insuficiente na conta poupança ${this.numero}.`);
    }
  }
}
