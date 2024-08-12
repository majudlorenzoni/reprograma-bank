import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../../domain/entities/gerente.entity'; 
import { UpdateGerenteDto } from '../dto/update-gerente.dto';

@Injectable()
export class UpdateGerenteUseCase {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async execute(idGerente: string, updateGerenteDto: UpdateGerenteDto): Promise<Gerente> {

    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente },
      relations: ['clientes'],
    });

    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${idGerente} não encontrado.`);
    }

    const updatedGerente = this.gerenteRepository.merge(gerente, updateGerenteDto);

    return await this.gerenteRepository.save(updatedGerente);
  }
}
