// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './domain/modules/cliente.module';
import { ContaModule } from './domain/modules/conta.module';
import { GerenteModule } from './domain/modules/gerente.module';
import { Cliente } from './domain/entities/cliente.entity';
import { Gerente } from './domain/entities/gerente.entity';
import { Conta } from './domain/entities/conta.entity';
import { ContaCorrente } from './domain/entities/contaCorrente.entity';
import { ContaPoupanca } from './domain/entities/contaPoupanca.entity';
import { GerenteController } from './infrastructure/adapters/controllers/gerente.controller';
import { ClienteController } from './infrastructure/adapters/controllers/cliente.controller';
import { ContaController } from './infrastructure/adapters/controllers/conta.controller';

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
    ContaModule,
    ClienteModule,
    GerenteModule,
  ],
  controllers: [GerenteController, ClienteController, ContaController],
})
export class AppModule {}
