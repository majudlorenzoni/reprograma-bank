import { Injectable } from '@nestjs/common';
import { CreateContaDto } from '../../application/conta/dto/create-conta.dto';
import { UpdateContaDto } from '../../application/conta/dto/update-conta.dto';
import { ListContasUseCase } from '../../application/conta/use-case/list-contas-use-case';
import { ListByIdContaUseCase } from '../../application/conta/use-case/list-by-id-conta-use-case';
import { CreateContaUseCase } from '../../application/conta/use-case/create-conta-use-case';
import { UpdateContaUseCase } from '../../application/conta/use-case/update-conta-use-case';
import { DeleteContaUseCase } from '../../application/conta/use-case/delete-conta-use-case';
import { DepositUseCase } from 'src/application/conta/use-case/deposit-use-case';
import { WithdrawUseCase } from 'src/application/conta/use-case/withdraw-use-case';
import { TransferUseCase } from 'src/application/conta/use-case/transfer-use-case';
import { PaymentPixUseCase } from 'src/application/conta/use-case/payment-pix-use-case';
import { PaymentBoletoUseCase } from 'src/application/conta/use-case/payment-boleto-use-case';

@Injectable()
export class ContaService {
  constructor(
    private readonly createContaUseCase: CreateContaUseCase,
    private readonly updateContaUseCase: UpdateContaUseCase,
    private readonly deleteContaUseCase: DeleteContaUseCase,
    private readonly listContasUseCase: ListContasUseCase,
    private readonly listByIdContaUseCase: ListByIdContaUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly transferUseCase: TransferUseCase,
    private readonly paymentPixUseCase: PaymentPixUseCase,
    private readonly paymentBoletoUseCase: PaymentBoletoUseCase,
  ) {}

  async create(createContaDto: CreateContaDto, clienteId: string) {
    return await this.createContaUseCase.execute(createContaDto, clienteId);
  }

  async update(id: number, updateContaDto: UpdateContaDto) {
    return await this.updateContaUseCase.execute(id, updateContaDto);
  }

  async delete(numeroConta: string) {
    return await this.deleteContaUseCase.execute(numeroConta);
  }

  async listAll(clienteId: string) {
    return await this.listContasUseCase.execute(clienteId);
  }

  async listById(id: number) {
    return await this.listByIdContaUseCase.execute(id);
  }

  async listAllByClienteId(clienteId: string) {
    return await this.listContasUseCase.execute(clienteId);
  }

  async depositar(id: number, valor: number) {
    await this.depositUseCase.execute(id, valor);
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  async sacar(id: number, valor: number) {
    await this.withdrawUseCase.execute(id, valor);
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  async transferir(origemId: number, destinoId: number, valor: number) {
    await this.transferUseCase.execute(origemId, destinoId, valor);
    console.log(`Transferência de R$ ${valor.toFixed(2)} realizada com sucesso.`);
  }

  async realizarPagamentoPIX(id: number, valor: number) {
    await this.paymentPixUseCase.execute(id, valor);
    console.log(`Pagamento de PIX no valor de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  async realizarPagamentoBoleto(id: number, numeroBoleto: string, valor: number) {
    await this.paymentBoletoUseCase.execute(id, numeroBoleto, valor);
    console.log(`Pagamento do boleto ${numeroBoleto} no valor de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }
}

