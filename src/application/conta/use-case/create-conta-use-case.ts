import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContaDto } from '../dto/create-conta.dto';
import { Conta } from '../../../domain/entity/conta.entity';
import { ContaCorrente } from '../../../domain/entity/contaCorrente.entity';
import { ContaPoupanca } from '../../../domain/entity/contaPoupanca.entity';

@Injectable()
export class CreateContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private contaRepository: Repository<Conta>,
    @InjectRepository(ContaCorrente)
    private contaCorrenteRepository: Repository<ContaCorrente>,
    @InjectRepository(ContaPoupanca)
    private contaPoupancaRepository: Repository<ContaPoupanca>,
  ) {}

  async execute(createContaDto: CreateContaDto): Promise<Conta> {
    let conta;

    if (createContaDto.tipoConta === 'corrente') {
      conta = this.contaCorrenteRepository.create(createContaDto);
      conta = await this.contaCorrenteRepository.save(conta);
    } else if (createContaDto.tipoConta === 'poupanca') {
      conta = this.contaPoupancaRepository.create(createContaDto);
      conta = await this.contaPoupancaRepository.save(conta);
    }

    return conta;
  }
}
