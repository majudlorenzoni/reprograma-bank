import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne } from 'typeorm';
import { Cliente } from './cliente.entity'; // Import the 'Cliente' class from the appropriate module

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipoConta' } })
export class Conta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, cliente => cliente.contasAssociadas, { 
    cascade: ['insert', 'update'] 
  })
  cliente: Cliente;


  @Column()
  agencia: string;

  @Column()
  numero: string;

  @Column('decimal')
  saldo: number;

  @Column()
  tipoConta: string;

  @Column({ nullable: true })
  limite?: number;

  @Column({ nullable: true })
  taxaJuros?: number;


}
