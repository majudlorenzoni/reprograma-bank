import * as crypto from 'crypto';
import { Conta } from './conta';
import { Gerente } from './gerente';


export class Cliente {
  private id: string;
  private nomeCompleto: string;
  private endereco: {rua: string, numero: string, bairro: string, cidade: string, cep: string, estado: string};
  private telefone: string;
  public contasAssociadas: Conta[] = [];
  private gerente: Gerente;
  public rendaSalarial: number;
 
  constructor(nomeCompleto: string, endereco: {rua: string, numero: string, bairro: string, cidade: string, cep: string, estado: string}, telefone: string, gerente: Gerente, contasAssociadas: Conta[] = [], rendaSalarial: number){
    this.nomeCompleto = nomeCompleto;    
    this.id = crypto.randomUUID();
    this.endereco = endereco;
    this.telefone = telefone;
    this.gerente = gerente;
    this.contasAssociadas = contasAssociadas;
    this.rendaSalarial = rendaSalarial;
  }
  
  getId(): string {
    return this.id;
  }

  abrirConta(conta: Conta): void {
      this.contasAssociadas.push(conta);
      console.log(`Conta ${conta.numero} aberta para o cliente ${this.nomeCompleto}.`);
  }

  fecharConta(conta: Conta): void {
    const index = this.contasAssociadas.findIndex(c => c.numero === conta.numero);
    if (index !== -1) {
      this.contasAssociadas.splice(index, 1);
      console.log(`Conta ${conta.numero} fechada para o cliente ${this.nomeCompleto}.`);
    } else {
      console.log(`Conta ${conta.numero} não encontrada para o cliente ${this.nomeCompleto}.`);
    }
  }

  mudarTipoConta(conta: Conta, novoTipo: string): void {
    const contaCliente = this.contasAssociadas.find(c => c.numero === conta.numero);
    if (contaCliente) {
      contaCliente.tipoConta = novoTipo;
      console.log(`Tipo da conta ${conta.numero} modificada para ${novoTipo} para o cliente ${this.nomeCompleto}.`);
    } else {
      console.log(`Conta ${conta.numero} não encontrada para o cliente ${this.nomeCompleto}.`);
    }
  }
}