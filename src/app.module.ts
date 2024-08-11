import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Conta } from './domain/entities/conta.entity';
import { Cliente } from './domain/entities/cliente.entity'; // Importe a entidade Cliente
import { ContaPoupanca } from './domain/entities/contaPoupanca.entity';
import { ContaCorrente } from './domain/entities/contaCorrente.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      database: 'reprogramabank',
      username: 'reprograma8',
      password: 'repro',
      entities: [Conta, Cliente],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Conta, Cliente]), // Inclua todos os repositórios necessários
    // Adicione outros módulos necessários
  ],
  // Outros módulos, providers e controllers
})

export class AppModule {}
