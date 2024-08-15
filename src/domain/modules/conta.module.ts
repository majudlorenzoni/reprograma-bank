import { Module } from '@nestjs/common';

import { CreateContaUseCase } from 'src/application/conta/use-case/create-conta-use-case';
import { UpdateContaUseCase } from 'src/application/conta/use-case/update-conta-use-case';
import { DeleteContaUseCase } from 'src/application/conta/use-case/delete-conta-use-case';
import { ListContasUseCase } from 'src/application/conta/use-case/list-contas-use-case';
import { ListByIdContaUseCase } from 'src/application/conta/use-case/list-by-id-conta-use-case';
import { DepositUseCase } from 'src/application/conta/use-case/deposit-use-case';
import { WithdrawUseCase } from 'src/application/conta/use-case/withdraw-use-case';
import { TransferUseCase } from 'src/application/conta/use-case/transfer-use-case';
import { PaymentPixUseCase } from 'src/application/conta/use-case/payment-pix-use-case';
import { PaymentBoletoUseCase } from 'src/application/conta/use-case/payment-boleto-use-case';

import { ContaRepository } from 'src/infrastructure/repositories/typeOrm/conta.repository';
import { ContaService } from '../services/conta.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ContaService,
    CreateContaUseCase,
    UpdateContaUseCase,
    DeleteContaUseCase,
    ListContasUseCase,
    ListByIdContaUseCase,
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    PaymentPixUseCase,
    PaymentBoletoUseCase,
  ],
  exports: [
    ContaService,
    CreateContaUseCase,
    UpdateContaUseCase,
    DeleteContaUseCase,
    ListContasUseCase,
    ListByIdContaUseCase,
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    PaymentPixUseCase,
    PaymentBoletoUseCase,
  ],
})
export class ContaModule {}
