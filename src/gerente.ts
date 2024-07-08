import { Cliente } from './cliente';
import { Conta } from './conta';
import { ContaCorrente } from './contaCorrente';
import { ContaPoupanca } from './contaPoupanca';
import * as crypto from 'crypto';

export class Gerente  {
  public nomeCompleto: string;
  private id: string;
  protected clientes: Cliente[] = [];

  constructor(nomeCompleto: string) {
    this.nomeCompleto = nomeCompleto;
    this.id = crypto.randomUUID();
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
    console.log(`Cliente ${cliente.getId()} adicionado ao gerente ${this.nomeCompleto}.`);
  }

  removerCliente(idCliente: string): void {
    const index = this.clientes.findIndex(cliente => cliente.getId() === idCliente);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      console.log(`Cliente ${idCliente} removido do gerente ${this.nomeCompleto}.`);
    } else {
      console.log(`Cliente ${idCliente} não encontrado.`);
    }
  }


  abrirConta(cliente: Cliente, tipoConta: string): void {
    const numeroConta = `001-${Math.floor(Math.random() * 1000)}`; 
    switch (tipoConta.toLowerCase()) {
      case 'corrente':
        cliente.abrirConta(new ContaCorrente(cliente, '001', numeroConta, 0, 'corrente', 1000)); 
        break;
      case 'poupanca':
        cliente.abrirConta(new ContaPoupanca(cliente, '001', numeroConta, 0, 'poupanca', 0.5));
        break;
      default:
        console.log(`Tipo de conta '${tipoConta}' não suportado.`);
        break;
    }
  }

  fecharConta(cliente: Cliente, conta: Conta): void {
    cliente.fecharConta(conta);
  }

  mudarTipoConta(cliente: Cliente, conta: Conta, novoTipo: string): void {
    cliente.mudarTipoConta(conta, novoTipo);
  }
}