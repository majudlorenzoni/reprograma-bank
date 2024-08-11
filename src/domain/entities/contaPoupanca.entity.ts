// src/entities/conta-poupanca.entity.ts
import { Entity } from 'typeorm';
import { Conta } from './conta.entity';

@Entity()
export class ContaPoupanca extends Conta {
  // Adicione propriedades e métodos específicos para Conta Poupança, se necessário
}
