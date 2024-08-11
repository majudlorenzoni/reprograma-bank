import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { GerenteService } from '../../domain/services/gerente.service';
import { ClienteService } from '../../domain/services/cliente.service';
import { Gerente } from '../../domain/models/gerente.model';
import { Cliente } from '../../domain/models/cliente.model';

@Controller('gerentes')
export class GerenteController {
  constructor(
    private readonly gerenteService: GerenteService,
    private readonly clienteService: ClienteService,
  ) {}

  @Post()
  adicionarGerente(@Body() body: { nomeCompleto: string }): {
    gerente: Gerente;
  } {
    const { nomeCompleto } = body;
    const novoGerente = this.gerenteService.adicionarGerente(nomeCompleto);
    return { gerente: novoGerente };
  }

  @Get()
  listarGerentes(): { gerentes: Gerente[] } {
    const gerentes = this.gerenteService.listarGerentes();
    return { gerentes };
  }

  @Get(':idGerente')
  encontrarGerentePorId(
    @Param('idGerente') id: string,
  ): { gerente: Gerente } | NotFoundException {
    const gerente = this.gerenteService.encontrarGerentePorId(id);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    return { gerente };
  }

  @Post(':idGerente/clientes')
  adicionarCliente(
    @Param('idGerente') idGerente: string,
    @Body() novoCliente: any, // Ajuste para capturar o corpo completo da requisição
  ): { message: string } {
    const gerente = this.gerenteService.encontrarGerentePorId(idGerente);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }

    this.gerenteService.adicionarClienteGerente(gerente, novoCliente);
    return {
      message: `Cliente ${novoCliente.nomeCompleto} adicionado ao gerente ${gerente.nomeCompleto}`,
    };
  }

  @Delete(':idGerente/clientes/:idCliente')
  removerCliente(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
  ): { message: string } {
    const gerente = this.gerenteService.encontrarGerentePorId(idGerente);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    this.gerenteService.removerCliente(gerente, idCliente);
    return {
      message: `Cliente ${idCliente} removido do gerente ${gerente.nomeCompleto}`,
    };
  }

  @Post(':idGerente/clientes/:idCliente/contas')
  abrirConta(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
    @Body() body: { tipoConta: string },
  ): { message: string } {
    const gerente = this.gerenteService.encontrarGerentePorId(idGerente);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    const cliente = this.clienteService.buscarCliente(idCliente);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    this.gerenteService.abrirConta(gerente, cliente, body.tipoConta);
    return {
      message: `Conta aberta para o cliente ${idCliente} pelo gerente ${gerente.nomeCompleto}`,
    };
  }

  @Patch(':idGerente/clientes/:idCliente/contas/:numeroConta')
  mudarTipoConta(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
    @Param('numeroConta') numeroConta: string,
    @Body() body: { novoTipo: string },
  ): { message: string } {
    const gerente = this.gerenteService.encontrarGerentePorId(idGerente);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    const cliente = this.clienteService.buscarCliente(idCliente);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    this.gerenteService.mudarTipoConta(
      gerente,
      cliente,
      numeroConta,
      body.novoTipo,
    );
    return {
      message: `Tipo de conta modificada para ${body.novoTipo} para o cliente ${idCliente} pelo gerente ${gerente.nomeCompleto}`,
    };
  }

  @Delete(':idGerente/clientes/:idCliente/contas/:numeroConta')
  fecharConta(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
    @Param('numeroConta') numeroConta: string,
  ): { message: string } {
    const gerente = this.gerenteService.encontrarGerentePorId(idGerente);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    const cliente = this.clienteService.buscarCliente(idCliente);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    this.gerenteService.fecharConta(gerente, cliente, numeroConta);
    return {
      message: `Conta ${numeroConta} fechada para o cliente ${idCliente} pelo gerente ${gerente.nomeCompleto}`,
    };
  }
}
