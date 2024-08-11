import { Injectable } from '@nestjs/common';
import { Cliente } from '../models/cliente.model';
import { Conta } from '../entities/conta.entity';
import { ContaCorrente } from '../models/contaCorrente.model';
import { ContaPoupanca } from '../models/contaPoupanca.model';

@Injectable()
export class ContaService {
  abrirConta(cliente: Cliente, tipoConta: string): void {
    const numeroConta = `001-${Math.floor(Math.random() * 1000)}`;
    switch (tipoConta.toLowerCase()) {
      case 'corrente':
        if (cliente.rendaSalarial >= 500) {
          cliente.contasAssociadas.push(
            new ContaCorrente(cliente, '001', numeroConta, 0, 'corrente', 100),
          );
          console.log(
            `Conta corrente ${numeroConta} aberta para o cliente ${cliente.nomeCompleto}.`,
          );
        } else {
          console.log(
            `Cliente ${cliente.nomeCompleto} não possui renda suficiente para abrir uma conta corrente.`,
          );
        }
        break;
      case 'poupanca':
        cliente.contasAssociadas.push(
          new ContaPoupanca(cliente, '001', numeroConta, 0, 'poupanca', 0.5),
        );
        console.log(
          `Conta poupança ${numeroConta} aberta para o cliente ${cliente.nomeCompleto}.`,
        );
        break;
      default:
        console.log(`Tipo de conta '${tipoConta}' não suportado.`);
        break;
    }
  }

  fecharConta(cliente: Cliente, numeroConta: string): void {
    const index = cliente.contasAssociadas.findIndex(
      (c) => c.numero === numeroConta,
    );
    if (index !== -1) {
      cliente.contasAssociadas.splice(index, 1);
      console.log(
        `Conta ${numeroConta} fechada para o cliente ${cliente.nomeCompleto}.`,
      );
    } else {
      console.log(
        `Conta ${numeroConta} não encontrada para o cliente ${cliente.nomeCompleto}.`,
      );
    }
  }

  mudarTipoConta(
    cliente: Cliente,
    numeroConta: string,
    novoTipo: string,
  ): void {
    const conta = cliente.contasAssociadas.find(
      (c) => c.numero === numeroConta,
    );
    if (conta) {
      conta.tipoConta = novoTipo;
      console.log(
        `Tipo da conta ${numeroConta} modificada para ${novoTipo} para o cliente ${cliente.nomeCompleto}.`,
      );
    } else {
      console.log(
        `Conta ${numeroConta} não encontrada para o cliente ${cliente.nomeCompleto}.`,
      );
    }
  }

  listarContas(cliente: Cliente): Conta[] {
    return cliente.contasAssociadas;
  }

  getContaByNumero(cliente: Cliente, numeroConta: string): Conta | undefined {
    return cliente.contasAssociadas.find((c) => c.numero === numeroConta);
  }

  depositar(conta: Conta, valor: number): void {
    conta.depositar(valor);
  }

  sacar(conta: Conta, valor: number): boolean {
    return conta.sacar(valor);
  }

  transferir(origem: Conta, destino: Conta, valor: number): boolean {
    return origem.transferir(destino, valor);
  }

  realizarPagamentoPIX(conta: Conta, valor: number): void {
    if (conta.verificarSaldo(valor)) {
      // Lógica para realizar pagamento por PIX
      console.log(
        `Pagamento de PIX no valor de R$ ${valor.toFixed(2)} realizado com sucesso.`,
      );
      conta.sacar(valor); // Reduz o saldo da conta após o pagamento
    } else {
      console.log(
        `Cliente não possui saldo suficiente ou limite disponível para realizar o pagamento.`,
      );
    }
  }

  realizarPagamentoBoleto(
    conta: Conta,
    numeroBoleto: string,
    valor: number,
  ): void {
    if (conta.verificarSaldo(valor)) {
      // Lógica para realizar pagamento por número de boleto
      console.log(
        `Pagamento do boleto ${numeroBoleto} no valor de R$ ${valor.toFixed(2)} realizado com sucesso.`,
      );
      conta.sacar(valor); // Reduz o saldo da conta após o pagamento
    } else {
      console.log(
        `Cliente não possui saldo suficiente ou limite disponível para realizar o pagamento.`,
      );
    }
  }
}

export const contaService = new ContaService();
