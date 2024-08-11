// src/entities/conta-corrente.entity.ts
import { Entity } from 'typeorm';
import { Conta } from './conta.entity';

@Entity()
export class ContaCorrente extends Conta {
  // Adicione propriedades e métodos específicos para Conta Corrente, se necessário
}
