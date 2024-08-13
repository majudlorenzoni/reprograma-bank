import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './repositories/typeOrm/cliente.repository';
import { ContaRepository } from './repositories/typeOrm/conta.repository';
import { GerenteRepository } from './repositories/typeOrm/gerente.repository';
import { Cliente } from '../domain/entity/cliente.entity';
import { Conta } from '../domain/entity/conta.entity';
import { Gerente } from '../domain/entity/gerente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Conta, Gerente])], 
  providers: [
    ClienteRepository,
    ContaRepository,
    GerenteRepository,
  ],
  exports: [
    ClienteRepository,
    ContaRepository,
    GerenteRepository,
    TypeOrmModule,
  ],
})
export class InfrastructureModule {}
