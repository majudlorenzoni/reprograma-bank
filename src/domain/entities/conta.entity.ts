import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance} from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo_conta' } })

export class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @Column()
  agencia: string;

  @Column()
  numero: string;

  @Column('decimal')
  saldo: number;

  @Column()
  tipoConta: string;

  @Column({ nullable: true, type: 'decimal' })
  limite?: number;

  @Column({ nullable: true, type: 'decimal' })
  taxaJuros?: number;
}
