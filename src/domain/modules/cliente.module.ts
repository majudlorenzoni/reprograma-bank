import { Module } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { ContaModule } from './conta.module';

@Module({
  imports: [ContaModule], 
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
