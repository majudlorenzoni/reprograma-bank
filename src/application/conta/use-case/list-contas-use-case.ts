import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entity/conta.entity';
import { Cliente } from '../../../domain/entity/cliente.entity';

@Injectable()
export class ListContasUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async execute(clienteId: string): Promise<Conta[]> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
      relations: ['contasAssociadas'],
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    return cliente.contasAssociadas;
  }
}
