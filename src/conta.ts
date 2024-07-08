import { Cliente } from './cliente';

export class Conta {
  protected cliente: Cliente;
  protected agencia: string;
  public numero: string;
  protected saldo: number;
  public tipoConta: string;

  constructor(cliente: Cliente, agencia: string, numero:string, saldo: number, tipoConta: string) {
    this.cliente = cliente;
    this.agencia = agencia;
    this.numero = numero;
    this.saldo = saldo;
    this.tipoConta = tipoConta;
  }

  depositar(valor: number): void {
    this.saldo += valor;
    console.log(`Depositado ${valor} na conta ${this.numero}. Novo saldo: ${this.saldo}`);
  }

  sacar(valor: number): void {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      console.log(`Sacado ${valor} da conta ${this.numero}. Novo saldo: ${this.saldo}`);
    } else {
      console.log(`Saldo insuficiente na conta ${this.numero}.`);
    }
  }

  verificarSaldo(): number {
    return this.saldo;
  }

  transferir(destino: Conta, valor: number): void {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      destino.depositar(valor);
      console.log(`Transferidos ${valor} da conta ${this.numero} para a conta ${destino.numero}.`);
    } else {
      console.log(`Saldo insuficiente na conta ${this.numero} para transferência.`);
    }
  }
}