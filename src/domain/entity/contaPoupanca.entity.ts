import { Entity, Column } from 'typeorm';
import { Conta } from './conta.entity';

@Entity()
export class ContaPoupanca extends Conta {
  @Column('decimal')
  taxaJuros: number;
}
