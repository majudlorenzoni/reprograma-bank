import { Entity, Column } from 'typeorm';
import { Conta } from './conta.entity';

@Entity()
export class ContaCorrente extends Conta {
  @Column('decimal')
  limiteChequeEspecial: number;

  usarChequeEspecial(valor: number): boolean {
    if (this.saldo + this.limiteChequeEspecial >= valor) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }
}
