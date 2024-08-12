import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entities/gerente.entity'; 
import { Cliente } from '../../../domain/entities/cliente.entity';

@Injectable()
export class AddClienteToGerenteUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
    
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async execute(gerenteId: string, clienteId: string): Promise<void> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente: gerenteId }, 
      relations: ['clientes'],
    });
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${gerenteId} não encontrado.`);
    }

    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId }, 
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }

    gerente.clientes.push(cliente);
    await this.gerenteRepository.save(gerente);
  }
}