import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGerenteRepository } from '../interfaces/gerente.repository.interface';
import { Gerente } from '../../entities/gerente.entity';

@Injectable()
export class GerenteRepository implements IGerenteRepository {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async findById(id: string): Promise<Gerente | null> {
    return this.gerenteRepository.findOneBy({ id });
  }

  async findAll(): Promise<Gerente[]> {
    return this.gerenteRepository.find();
  }

  async save(gerente: Gerente): Promise<Gerente> {
    return this.gerenteRepository.save(gerente);
  }

  async delete(id: string): Promise<void> {
    await this.gerenteRepository.delete(id);
  }
}