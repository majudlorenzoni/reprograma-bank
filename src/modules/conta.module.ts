import { Module, forwardRef } from '@nestjs/common';
import { ContaController } from '../controllers/conta.controller';
import { ContaService } from '../services/conta.service';
import { ClienteModule } from './cliente.module';

@Module({
  imports: [forwardRef(() => ClienteModule)], // Use forwardRef para resolver a dependência circular
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService],
})
export class ContaModule {}
