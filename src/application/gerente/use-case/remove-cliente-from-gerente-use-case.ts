import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entities/gerente.entity'; 

@Injectable()
export class RemoveClienteFromGerenteUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async execute(gerenteId: string, clienteId: string): Promise<void> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente: gerenteId }, 
    });
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${gerenteId} não encontrado.`);
    }

    const clienteIndex = gerente.clientes.findIndex(cliente => cliente.id === clienteId);
    if (clienteIndex === -1) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado no gerente ${gerenteId}.`);
    }

    gerente.clientes.splice(clienteIndex, 1);
    await this.gerenteRepository.save(gerente);
  }
}
