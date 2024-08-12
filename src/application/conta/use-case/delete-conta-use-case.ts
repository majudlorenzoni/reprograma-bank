import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entities/conta.entity';

@Injectable()
export class DeleteContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async execute(id: number): Promise<void> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    await this.contaRepository.delete(id);
  }
}