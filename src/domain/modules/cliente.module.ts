import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from 'src/infrastructure/adapters/repositories/typeOrm/cliente.repository';
import { ClienteService } from '../services/cliente.service';
import { CreateClienteUseCase } from 'src/application/cliente/use-case/create-cliente-use-case';
import { UpdateClienteUseCase } from 'src/application/cliente/use-case/update-cliente-use-case';
import { DeleteClienteUseCase } from 'src/application/cliente/use-case/delete-cliente-use-case';
import { ListClientesUseCase } from 'src/application/cliente/use-case/list-clientes.use-case';
import { ListClienteByIdUseCase } from 'src/application/cliente/use-case/list-by-id-cliente-use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]), 
  ],
  providers: [
    ClienteRepository, 
    ClienteService, 
    CreateClienteUseCase, 
    UpdateClienteUseCase,
    DeleteClienteUseCase, 
    ListClientesUseCase,
    ListClienteByIdUseCase, 
  ],
  exports: [
    ClienteService, 
    ClienteRepository, 
  ],
})
export class ClienteModule {}
