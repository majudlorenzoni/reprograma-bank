// src/domain/repositories/gerente.repository.ts
import { Gerente } from '../../../../domain/entities/gerente.entity';

export interface IGerenteRepository {
  findById(id: string): Promise<Gerente | null>;
  findAll(): Promise<Gerente[]>;
  save(gerente: Gerente): Promise<Gerente>;
  delete(id: string): Promise<void>;
}
