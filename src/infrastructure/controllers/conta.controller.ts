import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClienteService } from '../../../domain/services/cliente.service';
import { ContaService } from '../../../domain/services/conta.service';
import { Cliente } from '../../../models/cliente.model';
import { Conta } from '../../../domain/entities/conta.entity';

@Controller('clientes/:id/contas')
export class ContaController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  @Get()
  async listarContas(@Param('id') clienteId: string): Promise<Conta[]> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return this.contaService.listarContas(cliente);
  }

  @Post('abrir')
  async abrirConta(
    @Param('id') clienteId: string,
    @Body() body: { tipoConta: string },
  ): Promise<{ message: string }> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const { tipoConta } = body;
    this.contaService.abrirConta(cliente, tipoConta);
    return { message: 'Conta aberta com sucesso' };
  }

  @Post('fechar/:numeroConta')
  async fecharConta(
    @Param('id') clienteId: string,
    @Param('numeroConta') numeroConta: string,
  ): Promise<{ message: string }> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    this.contaService.fecharConta(cliente, numeroConta);
    return { message: 'Conta fechada com sucesso' };
  }

  @Post('mudar-tipo')
  async mudarTipoConta(
    @Param('id') clienteId: string,
    @Body() body: { numeroConta: string; novoTipo: string },
  ): Promise<{ message: string }> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const { numeroConta, novoTipo } = body;
    this.contaService.mudarTipoConta(cliente, numeroConta, novoTipo);
    return { message: 'Tipo de conta modificado com sucesso' };
  }
  @Post('depositar')
  async depositar(
    @Param('id') clienteId: string,
    @Body() body: { numeroConta: string; valor: number },
  ): Promise<{ message: string }> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const { numeroConta, valor } = body;
    const conta: Conta = this.contaService.getContaByNumero(
      cliente,
      numeroConta,
    );
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    this.contaService.depositar(conta, valor);
    return { message: `Depósito de R$ ${valor} realizado com sucesso` };
  }

  @Post('sacar')
  async sacar(
    @Param('id') clienteId: string,
    @Body() body: { numeroConta: string; valor: number },
  ): Promise<{ message: string }> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const { numeroConta, valor } = body;
    const conta: Conta = this.contaService.getContaByNumero(
      cliente,
      numeroConta,
    );
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    const saqueRealizado: boolean = this.contaService.sacar(conta, valor);
    if (saqueRealizado) {
      return { message: `Saque de R$ ${valor} realizado com sucesso` };
    } else {
      throw new BadRequestException(
        `Saldo insuficiente para sacar R$ ${valor}`,
      );
    }
  }

  @Post('transferir')
  async transferir(
    @Param('id') clienteId: string,
    @Body() body: { contaOrigem: string; contaDestino: string; valor: number },
  ): Promise<{ message: string }> {
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const { contaOrigem, contaDestino, valor } = body;
    const origem: Conta = this.contaService.getContaByNumero(
      cliente,
      contaOrigem,
    );
    const destino: Conta = this.contaService.getContaByNumero(
      cliente,
      contaDestino,
    );
    if (!origem || !destino) {
      throw new NotFoundException('Conta de origem ou destino não encontrada');
    }
    const transferenciaRealizada: boolean = this.contaService.transferir(
      origem,
      destino,
      valor,
    );
    if (transferenciaRealizada) {
      return { message: `Transferência de R$ ${valor} realizada com sucesso` };
    } else {
      throw new BadRequestException(
        `Não foi possível realizar a transferência de R$ ${valor}`,
      );
    }
  }

  @Post('pagamento-pix')
  async realizarPagamentoPIX(
    @Param('id') clienteId: string,
    @Body() body: { numeroConta: string; valor: number },
  ): Promise<{ message: string }> {
    const { numeroConta, valor } = body;
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const conta: Conta = cliente.contasAssociadas.find(
      (c) => c.numero === numeroConta,
    );
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    this.contaService.realizarPagamentoPIX(conta, valor);
    return { message: 'Pagamento PIX realizado com sucesso' };
  }

  @Post('pagamento-boleto')
  async realizarPagamentoBoleto(
    @Param('id') clienteId: string,
    @Body() body: { numeroConta: string; numeroBoleto: string; valor: number },
  ): Promise<{ message: string }> {
    const { numeroConta, numeroBoleto, valor } = body;
    const cliente: Cliente = this.clienteService.buscarCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const conta: Conta = cliente.contasAssociadas.find(
      (c) => c.numero === numeroConta,
    );
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    this.contaService.realizarPagamentoBoleto(conta, numeroBoleto, valor);
    return { message: 'Pagamento de boleto realizado com sucesso' };
  }
}
