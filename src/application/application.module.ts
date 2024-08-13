import { Module } from '@nestjs/common';
import { ClienteController } from './cliente/controller/cliente.controller';
import { ContaController } from './conta/controller/conta.controller';
import { GerenteController } from './gerente/controller/gerente.controller';
import { DomainModule } from 'src/domain/domain.module';
import { CreateContaUseCase } from './conta/use-case/create-conta-use-case';
import { UpdateClienteUseCase } from './cliente/use-case/update-cliente-use-case';
import { DeleteContaUseCase } from './conta/use-case/delete-conta-use-case';
import { ListContasUseCase } from './conta/use-case/list-contas-use-case';
import { ListByIdContaUseCase } from './conta/use-case/list-by-id-conta-use-case';
import { DepositUseCase } from './conta/use-case/deposit-use-case';
import { WithdrawUseCase } from './conta/use-case/withdraw-use-case';
import { TransferUseCase } from './conta/use-case/transfer-use-case';
import { PaymentPixUseCase } from './conta/use-case/payment-pix-use-case';
import { PaymentBoletoUseCase } from './conta/use-case/payment-boleto-use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: [
    CreateContaUseCase,
    UpdateClienteUseCase,
    DeleteContaUseCase,
    ListContasUseCase,
    ListByIdContaUseCase,
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    PaymentPixUseCase,
    PaymentBoletoUseCase,
  ],
  controllers: [ClienteController, ContaController, GerenteController],
  exports: [
    CreateContaUseCase,
    UpdateClienteUseCase,
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

export class ApplicationModule {}