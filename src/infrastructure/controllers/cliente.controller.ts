import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';


import { ClienteService } from '../../../domain/services/cliente.service';
import { ContaService } from '../../../domain/services/conta.service'; // Import the correct class
import { Conta } from '../../../domain/entities/conta.entity';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  @Get(':id/contas')
  async listarContas(@Param('id') clienteId: string) {
    const cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const contas = this.contaService.listarContas(cliente);
    return contas;
  }

  @Post(':id/contas')
  async abrirConta(
    @Param('id') clienteId: string,
    @Body() body: { tipoConta: string },
  ) {
    const cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    this.contaService.abrirConta(cliente, body.tipoConta);
    return { message: 'Conta aberta com sucesso' };
  }

  @Delete(':id/contas/:numeroConta')
  async fecharConta(
    @Param('id') clienteId: string,
    @Param('numeroConta') numeroConta: string,
  ) {
    const cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const conta = this.contaService.getContaByNumero(cliente, numeroConta);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    this.contaService.fecharConta(cliente, numeroConta);
    return { message: 'Conta fechada com sucesso' };
  }

  @Put(':id/contas/:numeroConta')
  async mudarTipoConta(
    @Param('id') clienteId: string,
    @Param('numeroConta') numeroConta: string,
    @Body() body: { novoTipo: string },
  ) {
    const cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const conta = this.contaService.getContaByNumero(cliente, numeroConta);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    this.contaService.mudarTipoConta(cliente, numeroConta, body.novoTipo);
    return { message: 'Tipo de conta modificado com sucesso' };
  }
}
