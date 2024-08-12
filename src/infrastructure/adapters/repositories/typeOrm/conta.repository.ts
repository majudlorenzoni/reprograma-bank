import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Conta } from '../../../../domain/entities/conta.entity';
import { IContaRepository } from '../interfaces/conta.repository.interface';

@Injectable()
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
