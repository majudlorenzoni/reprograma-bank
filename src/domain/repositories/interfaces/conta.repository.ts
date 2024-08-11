import { Conta } from '../../entities/conta.entity';

export interface ContaRepository {
  salvar(conta: Conta): Promise<Conta>;
  buscarPorNumero(numero: string): Promise<Conta | null>;
  atualizar(conta: Conta): Promise<Conta>;
  deletar(id: number): Promise<void>;
  buscarTodos(): Promise<Conta[]>;
}
