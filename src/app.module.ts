import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Conta } from './domain/entities/conta.entity';
import { Cliente } from './domain/entities/cliente.entity'; // Importe a entidade Cliente
import { Gerente } from './domain/entities/gerente.entity'; // Importe a entidade Gerente
import { ContaCorrente } from './domain/entities/contaCorrente.entity';
import { ContaPoupanca } from './domain/entities/contaPoupanca.entity';

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
    TypeOrmModule.forFeature([Conta, Cliente]), // Inclua todos os repositórios necessários
    // Adicione outros módulos necessários
  ],
  // Outros módulos, providers e controllers
})

export class AppModule {}
