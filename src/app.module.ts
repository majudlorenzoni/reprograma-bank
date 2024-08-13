import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './domain/entity/cliente.entity';
import { Conta } from './domain/entity/conta.entity';
import { Gerente } from './domain/entity/gerente.entity';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ClienteModule } from './domain/modules/cliente.module';
import { ContaModule } from './domain/modules/conta.module';
import { GerenteModule } from './domain/modules/gerente.module';
import { ContaCorrente } from './domain/entity/contaCorrente.entity';
import { ContaPoupanca } from './domain/entity/contaPoupanca.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'reprogramabank',
      username: 'reprograma8',
      password: 'repro',
      entities: [Cliente, Gerente, Conta, ContaCorrente, ContaPoupanca],
      synchronize: true,
    }),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
    ClienteModule,
    ContaModule,
    GerenteModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}