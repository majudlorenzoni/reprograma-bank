import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

@Injectable()
export class UpdateClienteUseCase {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async execute(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['contasAssociadas', 'gerente'], // Carregar relações, se necessário
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    Object.assign(cliente, updateClienteDto);

    return await this.clienteRepository.save(cliente);
  }
}