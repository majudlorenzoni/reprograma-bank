import { Conta } from '../../../../domain/entities/conta.entity';

export interface IContaRepository {
  salvar(conta: Conta): Promise<Conta>;
  buscarPorNumero(numero: string): Promise<Conta | null>;
  atualizar(conta: Conta): Promise<Conta>;
  deletar(id: number): Promise<void>;
  buscarTodos(): Promise<Conta[]>;

  // saldo, limite de cheque especial, saque, deposito, transferencia, uso de cheque especial
}
