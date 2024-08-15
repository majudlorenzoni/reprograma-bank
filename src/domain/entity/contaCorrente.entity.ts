import { Entity } from 'typeorm';
import { Conta } from './conta.entity';
import { Column } from 'typeorm';

@Entity()
export class ContaCorrente extends Conta {
  @Column('decimal', { nullable: false })
  limiteChequeEspecial: number;
}