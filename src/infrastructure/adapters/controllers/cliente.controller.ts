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
import { ContaService } from '../../../domain/services/conta.service'; 
import { CreateContaDto } from '../../../application/conta/dto/create-conta.dto';


@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  @Get(':id/contas')
  async listarContas(@Param('id') clienteId: string) {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const contas = await this.contaService.listAllByClienteId(clienteId);
    return contas;
  }

  @Post(':id/contas')
  async abrirConta(
    @Param('id') clienteId: string,
    @Body() body: { tipoConta: string },
  ) {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    
    const createContaDto: CreateContaDto = {
      agencia: '0001',
      numero: this.generateNumeroConta(), 
      saldo: 0,
      tipoConta: body.tipoConta,
      limite: null,
      taxaJuros: null,
    };
    
    await this.contaService.create(createContaDto, clienteId);
    return { message: 'Conta aberta com sucesso' };
  }

  @Delete(':id/contas/:numeroConta')
  async fecharConta(
    @Param('id') clienteId: string,
    @Param('numeroConta') numeroConta: string,
  ) {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    await this.contaService.delete(numeroConta);
    return { message: 'Conta fechada com sucesso' };
  }

  private generateNumeroConta(): string {
    return '123456-' + Math.floor(Math.random() * 10);
  }
}
