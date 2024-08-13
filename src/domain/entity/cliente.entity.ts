import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Conta } from './conta.entity';
import { Gerente } from './gerente.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeCompleto: string;

  @Column('json')
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
  };

  @Column()
  telefone: string;

  @OneToMany(() => Conta, (conta) => conta.cliente, { cascade: true })
  contasAssociadas: Conta[];

  @ManyToOne(() => Gerente, (gerente) => gerente.clientes)
  gerente: Gerente;

  @Column('decimal')
  rendaSalarial: number;
}
