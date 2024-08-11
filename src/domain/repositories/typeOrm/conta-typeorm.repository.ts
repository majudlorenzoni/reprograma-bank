import { DataSource, Repository } from 'typeorm';
import { Conta } from '../../entities/conta.entity';
import { ContaRepository } from '../interfaces/conta.repository';

export class ContaTypeORMRepository implements ContaRepository {
  private repository: Repository<Conta>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Conta);
  }

  async salvar(conta: Conta): Promise<Conta> {
    return await this.repository.save(conta);
  }

  async buscarPorNumero(numero: string): Promise<Conta | null> {
    return await this.repository.findOne({ where: { numero } }) || null;
  }

  async atualizar(conta: Conta): Promise<Conta> {
    return await this.repository.save(conta);
  }

  async deletar(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async buscarTodos(): Promise<Conta[]> {
    return await this.repository.find();
  }
}

