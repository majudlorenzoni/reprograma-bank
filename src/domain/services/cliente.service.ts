// import { Injectable } from '@nestjs/common';
// import * as cripto from 'crypto';
// import { Gerente } from '../models/gerente.model';
// import { Cliente } from '../models/cliente.model';
// import { ContaService } from './conta.service';

// @Injectable()
// export class ClienteService {
//   private clientes: Cliente[] = [];
//   constructor(private readonly contaService: ContaService) {}

//   // metodo para listar todos os clientes
//   listarClientes(): Cliente[] {
//     return this.clientes;
//   }

//   // buscar clientes por id
//   buscarCliente(id: string): Cliente | undefined {
//     return this.clientes.find((cliente) => cliente.getIdCliente() === id);
//   }

//   // criar um novo cliente
//   criarCliente(cliente: Cliente): Cliente {
//     cliente.setId(cripto.randomBytes(16).toString('hex'));
//     this.clientes.push(cliente);
//     return cliente;
//   }

//   // atualizar informações de um cliente
//   atualizarCliente(
//     id: string,
//     clienteAtualizado: Cliente,
//   ): Cliente | undefined {
//     const index = this.clientes.findIndex(
//       (cliente) => cliente.getIdCliente() === id,
//     );
//     if (index !== -1) {
//       this.clientes[index] = clienteAtualizado;
//       return clienteAtualizado;
//     }
//     return undefined;
//   }

//   // remover um cliente
//   removerCliente(id: string): boolean {
//     const index = this.clientes.findIndex(
//       (cliente) => cliente.getIdCliente() === id,
//     );
//     if (index !== -1) {
//       this.clientes.splice(index, 1);
//       return true;
//     }
//     return false;
//   }

//   abrirConta(gerente: Gerente, cliente: Cliente, tipoConta: string): void {
//     this.contaService.abrirConta(cliente, tipoConta);
//   }

//   fecharConta(gerente: Gerente, cliente: Cliente, numeroConta: string): void {
//     this.contaService.fecharConta(cliente, numeroConta);
//   }

//   mudarTipoConta(
//     gerente: Gerente,
//     cliente: Cliente,
//     numeroConta: string,
//     novoTipo: string,
//   ): void {
//     this.contaService.mudarTipoConta(cliente, numeroConta, novoTipo);
//   }
// }
// src/services/cliente.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from '../repositories/typeOrm/cliente.repository';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteRepository)
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async getAllClientes(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }

  async getClienteById(id: string): Promise<Cliente | null> {
    return this.clienteRepository.findById(id);
  }

  async createCliente(cliente: Cliente): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  }

  async updateCliente(id: string, cliente: Partial<Cliente>): Promise<Cliente | null> {
    return this.clienteRepository.update(id, cliente);
  }

  async deleteCliente(id: string): Promise<void> {
    return this.clienteRepository.delete(id);
  }
}

