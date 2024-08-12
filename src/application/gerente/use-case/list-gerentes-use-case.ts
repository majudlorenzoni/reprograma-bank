import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entities/gerente.entity'; 


@Injectable()
export class ListGerenteUseCase {
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
