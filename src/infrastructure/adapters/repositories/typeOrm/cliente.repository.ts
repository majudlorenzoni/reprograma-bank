import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IClienteRepository } from '../interfaces/cliente.repository.interface';
import { Cliente } from '../../../../domain/entities/cliente.entity';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }
  async findById(id: string): Promise<Cliente | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async create(cliente: Cliente): Promise<Cliente> {
    return this.clienteRepository.save(cliente);
  }

  async update(id: string, cliente: Partial<Cliente>): Promise<Cliente | null> {
    return this.clienteRepository.save({ id, ...cliente });
  }

  async delete(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
