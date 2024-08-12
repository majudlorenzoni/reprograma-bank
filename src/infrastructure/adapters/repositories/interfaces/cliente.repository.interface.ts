import { Cliente } from '../../../../domain/entities/cliente.entity';

export interface IClienteRepository {
  findAll(): Promise<Cliente[]>;
  findById(id: string): Promise<Cliente | null>;
  create(cliente: Cliente): Promise<Cliente>;
  update(id: string, cliente: Partial<Cliente>): Promise<Cliente | null>;
  delete(id: string): Promise<void>;
}
