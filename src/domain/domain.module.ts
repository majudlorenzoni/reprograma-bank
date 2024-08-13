import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from '../domain/services/cliente.service';
import { ContaService } from '../domain/services/conta.service';
import { GerenteService } from '../domain/services/gerente.service';
import { Cliente } from '../domain/entity/cliente.entity';
import { Conta } from '../domain/entity/conta.entity';
import { Gerente } from '../domain/entity/gerente.entity';

import { ClienteModule } from './modules/cliente.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContaModule } from './modules/conta.module';
import { GerenteModule } from './modules/gerente.module';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([Cliente, Conta, Gerente]),
    ClienteModule,
    ContaModule,
    GerenteModule,
  ],
  providers: [ClienteService, ContaService, GerenteService],
  exports: [ClienteService, ContaService, GerenteService],
})
export class DomainModule {}