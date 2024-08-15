import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entity/conta.entity';
import { UpdateContaDto } from '../dto/update-conta.dto';

@Injectable()
export class UpdateContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async execute(id: string, updateAccountDto: UpdateContaDto): Promise<Conta> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    const updatedConta = this.contaRepository.merge(conta, updateAccountDto);

    return await this.contaRepository.save(updatedConta);
  }
}
