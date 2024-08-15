import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entity/gerente.entity';

@Injectable()
export class ListGerentesUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async execute(): Promise<Gerente[]> {
    return await this.gerenteRepository.find({
      relations: ['clientes'],
    });
  }
}
