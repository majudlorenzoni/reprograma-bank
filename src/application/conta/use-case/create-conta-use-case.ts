import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entity/conta.entity';
import { Cliente } from '../../../domain/entity/cliente.entity';
import { CreateContaDto } from '../dto/create-conta.dto';

@Injectable()
export class CreateContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async execute(
    CreateContaDto: CreateContaDto,
    clienteId: string,
  ): Promise<Conta> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const conta = this.contaRepository.create({
      ...CreateContaDto,
      cliente,
    });

    return await this.contaRepository.save(conta);
  }
}
