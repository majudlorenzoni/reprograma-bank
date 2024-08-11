import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity'

@Injectable()
export class ListClientByIdUseCase {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientRepository: Repository<Cliente>, // Usa Repository<Client> diretamente
  ) {}

  async execute(id: string): Promise<Cliente> {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return client;
  }
}
