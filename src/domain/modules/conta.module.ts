import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from '../entities/conta.entity';
import { ContaRepository } from 'src/infrastructure/adapters/repositories/typeOrm/conta.repository';
import { ClienteModule } from './cliente.module';
import { ContaService } from '../services/conta.service';
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
import { ContaController } from 'src/infrastructure/adapters/controllers/conta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conta]), 
    ClienteModule, 
  ],
  providers: [
    ContaRepository, 
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
  controllers: [ContaController],
  exports: [ContaService], 
})
export class ContaModule {}
