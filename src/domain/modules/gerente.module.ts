import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from '../entities/gerente.entity';
import { ClienteModule } from './cliente.module';
import { ContaModule } from './conta.module';
import { GerenteService } from '../services/gerente.service';
import { GerenteRepository } from 'src/infrastructure/adapters/repositories/typeOrm/gerente.repository';
import { CreateGerenteUseCase } from 'src/application/gerente/use-case/create-gerente-use-case';
import { UpdateGerenteUseCase } from 'src/application/gerente/use-case/update-gerente-use-case';
import { DeleteGerenteUseCase } from 'src/application/gerente/use-case/delele-gerente-use-case';
import { ListByIdGerenteUseCase } from 'src/application/gerente/use-case/list-by-id-gerente-use-case';
import { ListGerentesUseCase } from 'src/application/gerente/use-case/list-gerentes-use-case';
import { AddClienteToGerenteUseCase } from 'src/application/gerente/use-case/add-cliente-to-gerente-use-case';
import { RemoveClienteFromGerenteUseCase } from 'src/application/gerente/use-case/remove-cliente-from-gerente-use-case';
import { CreateContaUseCase } from 'src/application/conta/use-case/create-conta-use-case';
import { DeleteContaUseCase } from 'src/application/conta/use-case/delete-conta-use-case';
import { ListClienteByIdUseCase } from 'src/application/cliente/use-case/list-by-id-cliente-use-case';
import { ContaService } from '../services/conta.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gerente]),
    ClienteModule, // Para usar ListClienteByIdUseCase
    ContaModule,   // Para usar CreateContaUseCase e outros casos de uso relacionados a contas
  ],
  providers: [
    GerenteRepository, // Registro correto do repositório
    GerenteService,
    CreateGerenteUseCase,
    UpdateGerenteUseCase,
    DeleteGerenteUseCase,
    ListGerentesUseCase,
    ListByIdGerenteUseCase,
    AddClienteToGerenteUseCase,
    RemoveClienteFromGerenteUseCase,
    CreateContaUseCase,
    DeleteContaUseCase,
    ListClienteByIdUseCase,
    ContaService,
  ],
  exports: [GerenteService],
})
export class GerenteModule {}
