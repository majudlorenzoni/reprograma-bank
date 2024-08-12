import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entities/conta.entity';
import { WithdrawUseCase } from './withdraw-use-case';

@Injectable()
export class PaymentPixUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
    private readonly withdrawUseCase: WithdrawUseCase,
  ) {}

  async execute(id: number, valor: number): Promise<void> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    if (conta.saldo < valor) {
      throw new BadRequestException(`Saldo insuficiente na conta com ID ${id}.`);
    }

    await this.withdrawUseCase.execute(id, valor);
  }
}
