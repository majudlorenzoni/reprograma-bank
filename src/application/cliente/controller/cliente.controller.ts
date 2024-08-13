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

import { ClienteService } from 'src/domain/services/cliente.service';
import { ContaService } from 'src/domain/services/conta.service';
import { CreateContaDto } from 'src/application/conta/dto/create-conta.dto';
import { Cliente } from 'src/domain/entity/cliente.entity';
import { CreateClienteDto } from 'src/application/cliente/dto/create-cliente.dto'; // Add this line to import CreateClienteDto


@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  @Post('criarCliente')
  async criarCliente(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteService.create(createClienteDto);
    return cliente;
  }


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
    @Body() createContaDto: CreateContaDto
  ) {
    const conta = await this.contaService.create(createContaDto);

    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    cliente.contasAssociadas.push(conta);
    await this.clienteService.update(clienteId, cliente);

    return conta;
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

}
