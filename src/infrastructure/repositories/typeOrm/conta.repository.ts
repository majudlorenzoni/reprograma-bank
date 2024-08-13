import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../../domain/entity/conta.entity';
import { IContaRepository } from '../../../domain/interfaces/conta.repository.interface';

export class ContaRepository implements IContaRepository {
  constructor(
    @InjectRepository(Conta)
    private readonly repository: Repository<Conta>,
  ) {}

  async salvar(conta: Conta): Promise<Conta> {
    return await this.repository.save(conta);
  }

  async buscarPorNumero(numero: string): Promise<Conta | null> {
    return (await this.repository.findOne({ where: { numero } })) || null;
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
