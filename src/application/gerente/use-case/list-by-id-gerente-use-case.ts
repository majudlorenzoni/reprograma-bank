import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entities/gerente.entity'; 


@Injectable()
export class ListByIdGerenteUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async execute(idGerente: string): Promise<Gerente> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente },
      relations: ['clientes'],
    });

    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${idGerente} não encontrado.`);
    }

    return gerente;
  }
}
