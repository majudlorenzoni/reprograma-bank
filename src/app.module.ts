import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './modules/cliente.module'; // Importe o módulo do Cliente
import { ContaModule } from './modules/conta.module'; // Importe o módulo de Conta
import { GerenteModule } from './modules/gerente.module'; // Importe o módulo de Gerente

@Module({
  imports: [
    ClienteModule, 
    ContaModule,  
    GerenteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
