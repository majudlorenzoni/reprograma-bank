import { Module } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { ContaModule } from './conta.module'; // Verifique o caminho correto para o ContaModule

@Module({
  imports: [ContaModule], // Importe o ContaModule aqui
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
