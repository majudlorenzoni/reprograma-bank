import { Module } from '@nestjs/common';
import { CreateClienteUseCase } from 'src/application/cliente/use-case/create-cliente-use-case';
import { UpdateClienteUseCase } from 'src/application/cliente/use-case/update-cliente-use-case';
import { DeleteClienteUseCase } from 'src/application/cliente/use-case/delete-cliente-use-case';
import { ListClientesUseCase } from 'src/application/cliente/use-case/list-clientes.use-case';
import { ListClienteByIdUseCase } from 'src/application/cliente/use-case/list-by-id-cliente-use-case';
import { ClienteService } from '../services/cliente.service';
import { InfrastructureModule} from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ClienteService,
    CreateClienteUseCase,
    UpdateClienteUseCase,
    DeleteClienteUseCase,
    ListClientesUseCase,
    ListClienteByIdUseCase,
  ],
  exports: [
    CreateClienteUseCase,
    UpdateClienteUseCase,
    DeleteClienteUseCase,
    ListClientesUseCase,
    ListClienteByIdUseCase,
  ],
})
export class ClienteModule {}
