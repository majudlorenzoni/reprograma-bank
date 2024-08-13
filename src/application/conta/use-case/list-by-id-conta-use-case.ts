import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entity/conta.entity';

@Injectable()
export class ListByIdContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async execute(id: number): Promise<Conta> {
    const conta = await this.contaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    return conta;
  }
}
