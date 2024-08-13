import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entity/conta.entity';

@Injectable()
export class WithdrawUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async execute(id: number, valor: number): Promise<void> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    if (conta.saldo < valor) {
      throw new BadRequestException(
        `Saldo insuficiente na conta com ID ${id}.`,
      );
    }

    conta.saldo -= valor;
    await this.contaRepository.save(conta);
  }
}
