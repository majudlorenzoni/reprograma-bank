import { Injectable } from '@nestjs/common';
import * as cripto from 'crypto';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';
import { ContaService } from './conta.service';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];
  constructor(private readonly contaService: ContaService) {}

  // metodo para listar todos os clientes
  listarClientes(): Cliente[] {
    return this.clientes;
  }

  // buscar clientes por id
  buscarCliente(id: string): Cliente | undefined {
    return this.clientes.find((cliente) => cliente.getIdCliente() === id);
  }

  // criar um novo cliente
  criarCliente(cliente: Cliente): Cliente {
    cliente.setId(cripto.randomBytes(16).toString('hex'));
    this.clientes.push(cliente);
    return cliente;
  }

  // atualizar informações de um cliente
  atualizarCliente(
    id: string,
    clienteAtualizado: Cliente,
  ): Cliente | undefined {
    const index = this.clientes.findIndex(
      (cliente) => cliente.getIdCliente() === id,
    );
    if (index !== -1) {
      this.clientes[index] = clienteAtualizado;
      return clienteAtualizado;
    }
    return undefined;
  }

  // remover um cliente
  removerCliente(id: string): boolean {
    const index = this.clientes.findIndex(
      (cliente) => cliente.getIdCliente() === id,
    );
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  abrirConta(gerente: Gerente, cliente: Cliente, tipoConta: string): void {
    this.contaService.abrirConta(cliente, tipoConta);
  }

  fecharConta(gerente: Gerente, cliente: Cliente, numeroConta: string): void {
    this.contaService.fecharConta(cliente, numeroConta);
  }

  mudarTipoConta(
    gerente: Gerente,
    cliente: Cliente,
    numeroConta: string,
    novoTipo: string,
  ): void {
    this.contaService.mudarTipoConta(cliente, numeroConta, novoTipo);
  }
}
