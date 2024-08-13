import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity()
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  idGerente: string;

  @Column()
  nomeCompleto: string;

  @OneToMany(() => Cliente, (cliente) => cliente.gerente)
  clientes: Cliente[];

  constructor(nomeCompleto: string) {
    this.nomeCompleto = nomeCompleto;
  }
}
