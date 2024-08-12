import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entities/gerente.entity'; 
import { CreateGerenteDto } from '../dto/create-gerente.dto'; 

@Injectable()
export class CreateGerenteUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async execute(createGerenteDto: CreateGerenteDto): Promise<Gerente> {
    const { nomeCompleto } = createGerenteDto;

    const gerente = this.gerenteRepository.create({ nomeCompleto });

    return await this.gerenteRepository.save(gerente);
  }
}
