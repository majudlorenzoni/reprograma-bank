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
import { CreateContaDto } from '../dto/create-conta.dto';
import { ListByIdContaUseCase } from '../use-case/list-by-id-conta-use-case';
import { Conta } from '../../../domain/entity/conta.entity';

@Controller('clientes/:id/contas')
export class ContaController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
    private readonly listByIdContaUseCase: ListByIdContaUseCase,
  ) {}

  @Get()
  async listarContas(@Param('id') clienteId: string): Promise<Conta[]> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return await this.contaService.listAll(clienteId);
  }

  @Get('conta/:id')
  async getById(@Param('id') id: string) {
    const idConta = parseInt(id);
    return this.listByIdContaUseCase.execute(idConta);
  }

  @Post('abrirConta')
  async abrirConta(
    @Param('id') clienteId: string,
    @Body() body: CreateContaDto,
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    await this.contaService.create(body, clienteId);
    return { message: 'Conta aberta com sucesso' };
  }

  @Post('fechar/:numeroConta')
  async fecharConta(
    @Param('id') clienteId: string,
    @Param('numeroConta') numeroConta: string,
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    await this.contaService.delete(numeroConta);
    return { message: 'Conta fechada com sucesso' };
  }

  @Post('depositar/:contaId')
  async depositar(
    @Param('id') clienteId: string,
    @Param('contaId') contaId: number,
    @Body() body: { valor: number },
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const conta = await this.contaService.listById(contaId);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    await this.contaService.depositar(conta.id, body.valor);
    return { message: `Depósito de R$ ${body.valor} realizado com sucesso` };
  }

  @Post('sacar/:contaId')
  async sacar(
    @Param('id') clienteId: string,
    @Param('contaId') contaId: number,
    @Body() body: { valor: number },
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const conta = await this.contaService.listById(contaId);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    const saqueRealizado = await this.contaService.sacar(conta.id, body.valor);
    if (saqueRealizado !== undefined) {
      return { message: `Saque de R$ ${body.valor} realizado com sucesso` };
    } else {
      throw new BadRequestException(
        `Saldo insuficiente para sacar R$ ${body.valor}`,
      );
    }
  }

  @Post('transferir/:contaOrigemId/:contaDestinoId')
  async transferir(
    @Param('id') clienteId: string,
    @Param('contaOrigemId') contaOrigemId: number,
    @Param('contaDestinoId') contaDestinoId: number,
    @Body() body: { valor: number },
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const contaOrigem = await this.contaService.listById(contaOrigemId);
    const contaDestino = await this.contaService.listById(contaDestinoId);

    if (!contaOrigem || !contaDestino) {
      throw new NotFoundException('Conta de origem ou destino não encontrada');
    }

    const transferenciaRealizada = await this.contaService.transferir(
      contaOrigem.id,
      contaDestino.id,
      body.valor,
    );

    if (transferenciaRealizada !== undefined) {
      return {
        message: `Transferência de R$ ${body.valor} realizada com sucesso`,
      };
    } else {
      throw new BadRequestException(
        `Não foi possível realizar a transferência de R$ ${body.valor}`,
      );
    }
  }

  @Post('pagamento-pix/:contaId')
  async realizarPagamentoPIX(
    @Param('id') clienteId: string,
    @Param('contaId') contaId: number,
    @Body() body: { valor: number },
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const conta = await this.contaService.listById(contaId);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    await this.contaService.realizarPagamentoPIX(conta.id, body.valor);
    return { message: 'Pagamento PIX realizado com sucesso' };
  }

  @Post('pagamento-boleto/:contaId')
  async realizarPagamentoBoleto(
    @Param('id') clienteId: string,
    @Param('contaId') contaId: number,
    @Body() body: { numeroBoleto: string; valor: number },
  ): Promise<{ message: string }> {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const conta = await this.contaService.listById(contaId);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    await this.contaService.realizarPagamentoBoleto(
      conta.id,
      body.numeroBoleto,
      body.valor,
    );
    return { message: 'Pagamento de boleto realizado com sucesso' };
  }
}
