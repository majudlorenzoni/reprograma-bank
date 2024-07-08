import { Cliente } from './cliente.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Conta {
  constructor(
    public cliente: Cliente,
    public agencia: string,
    public numero: string,
    public saldo: number,
    public tipoConta: string,
    public limite?: number,
    public taxaJuros?: number,
  ) {}

  getSaldo(): number {
    return this.saldo;
  }

  getLimite(): number | undefined {
    return this.limite;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): boolean {
    if (this.verificarSaldo(valor)) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }

  verificarSaldo(valor: number): boolean {
    if (this.saldo >= valor) {
      return true;
    }
    // Verificar se a conta é Conta Corrente e se há limite de cheque especial
    if (this.tipoConta === 'Conta Corrente' && this.limite !== undefined) {
      const saldoMaisChequeEspecial = this.saldo + this.limite;
      if (saldoMaisChequeEspecial >= valor) {
        // Se o saldo mais o cheque especial forem suficientes
        // Deduz apenas do saldo, se possível
        const saldoNecessario = valor - this.saldo;
        this.saldo = 0; // Zera o saldo
        this.limite -= saldoNecessario; // Deduz do limite
        return true;
      }
    }
    return false;
  }

  transferir(contaDestino: Conta, valor: number): boolean {
    if (this.sacar(valor)) {
      contaDestino.depositar(valor);
      return true;
    }
    return false;
  }
}
