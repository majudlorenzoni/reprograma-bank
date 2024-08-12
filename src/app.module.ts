import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Conta } from './domain/entities/conta.entity';
import { Cliente } from './domain/entities/cliente.entity';
import { Gerente } from './domain/entities/gerente.entity';
import { ContaCorrente } from './domain/entities/contaCorrente.entity';
import { ContaPoupanca } from './domain/entities/contaPoupanca.entity';
import { ClienteRepository } from './infrastructure/adapters/repositories/typeOrm/cliente.repository';
import { ContaRepository } from './infrastructure/adapters/repositories/typeOrm/conta.repository';
import { GerenteRepository } from './infrastructure/adapters/repositories/typeOrm/gerente.repository';
import { GerenteController } from './infrastructure/adapters/controllers/gerente.controller';
import { ClienteController } from './infrastructure/adapters/controllers/cliente.controller';
import { ContaController } from './infrastructure/adapters/controllers/conta.controller';
import { GerenteService } from './domain/services/gerente.service';
import { ClienteService } from './domain/services/cliente.service';
import { ContaService } from './domain/services/conta.service';


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
    TypeOrmModule.forFeature([Conta, Cliente, Gerente]), 
  ],
  controllers: [GerenteController, ClienteController, ContaController],
  providers: [ClienteService, ContaService, GerenteService, ClienteRepository, ContaRepository, GerenteRepository],
  exports: [ClienteRepository, ContaRepository],
})
export class AppModule {}
