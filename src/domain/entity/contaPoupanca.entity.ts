import { Entity } from 'typeorm';
import { Conta } from './conta.entity';
import { Column } from 'typeorm';

@Entity()
export class ContaPoupanca extends Conta {
  @Column('decimal', { nullable: false })
  taxaJuros: number;
}