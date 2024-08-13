import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../../application/cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from '../../application/cliente/dto/update-cliente.dto';

import { CreateClienteUseCase } from '../../application/cliente/use-case/create-cliente-use-case';
import { UpdateClienteUseCase } from '../../application/cliente/use-case/update-cliente-use-case';
import { ListClientesUseCase } from '../../application/cliente/use-case/list-clientes.use-case';
import { ListClienteByIdUseCase } from '../../application/cliente/use-case/list-by-id-cliente-use-case';
import { DeleteClienteUseCase } from '../../application/cliente/use-case/delete-cliente-use-case';

@Injectable()
export class ClienteService {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly updateClienteUseCase: UpdateClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
    private readonly listByIdClienteUseCase: ListClienteByIdUseCase,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    return await this.createClienteUseCase.execute(createClienteDto);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    return await this.updateClienteUseCase.execute(id, updateClienteDto);
  }

  async delete(id: string) {
    return await this.deleteClienteUseCase.execute(id);
  }

  async listAll() {
    return await this.listClientesUseCase.execute();
  }

  async listById(id: string) {
    return await this.listByIdClienteUseCase.execute(id);
  }
}

