import { Module } from '@nestjs/common';
import { GerenteController } from '../controllers/gerente.controller';
import { GerenteService } from '../services/gerente.service';
import { ClienteModule } from './cliente.module';

@Module({
  imports: [ClienteModule], 
  controllers: [GerenteController],
  providers: [GerenteService],
})
export class GerenteModule {}
