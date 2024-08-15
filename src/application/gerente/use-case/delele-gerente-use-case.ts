import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entity/gerente.entity';

@Injectable()
export class DeleteGerenteUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async execute(gerenteId: string): Promise<void> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente: gerenteId },
    });
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }

    await this.gerenteRepository.remove(gerente);
  }
}
