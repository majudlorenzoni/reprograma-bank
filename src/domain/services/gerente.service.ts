import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGerenteDto } from '../../application/gerente/dto/create-gerente.dto';
import { UpdateGerenteDto } from '../../application/gerente/dto/update-gerente.dto';
import { CreateContaDto } from '../../application/conta/dto/create-conta.dto';

import { Gerente } from '../entity/gerente.entity';

import { AddClienteToGerenteUseCase } from 'src/application/gerente/use-case/add-cliente-to-gerente-use-case';
import { CreateGerenteUseCase } from 'src/application/gerente/use-case/create-gerente-use-case';
import { DeleteGerenteUseCase } from 'src/application/gerente/use-case/delele-gerente-use-case';
import { ListByIdGerenteUseCase } from 'src/application/gerente/use-case/list-by-id-gerente-use-case';
import { ListGerentesUseCase } from 'src/application/gerente/use-case/list-gerentes-use-case';
import { RemoveClienteFromGerenteUseCase } from 'src/application/gerente/use-case/remove-cliente-from-gerente-use-case';
import { UpdateGerenteUseCase } from 'src/application/gerente/use-case/update-gerente-use-case';

import { ListClienteByIdUseCase } from '../../application/cliente/use-case/list-by-id-cliente-use-case';
import { ContaService } from './conta.service';

@Injectable()
export class GerenteService {
  constructor(
    private readonly addClienteToGerenteUseCase: AddClienteToGerenteUseCase,
    private readonly createGerenteUseCase: CreateGerenteUseCase,
    private readonly deleteGerenteUseCase: DeleteGerenteUseCase,
    private readonly listByIdGerenteUseCase: ListByIdGerenteUseCase,
    private readonly listGerentesUseCase: ListGerentesUseCase,
    private readonly removeClienteFromGerenteUseCase: RemoveClienteFromGerenteUseCase,
    private readonly updateGerenteUseCase: UpdateGerenteUseCase,
    private readonly findClienteByIdUseCase: ListClienteByIdUseCase,
    private readonly contaService: ContaService,
  ) {}

  async criarGerente(createGerenteDto: CreateGerenteDto): Promise<Gerente> {
    return this.createGerenteUseCase.execute(createGerenteDto);
  }

  async atualizarGerente(
    id: string,
    updateGerenteDto: UpdateGerenteDto,
  ): Promise<Gerente> {
    const gerente = await this.listByIdGerenteUseCase.execute(id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return this.updateGerenteUseCase.execute(id, updateGerenteDto);
  }

  async listarGerentes(): Promise<Gerente[]> {
    return this.listGerentesUseCase.execute();
  }

  async deletarGerente(id: string): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    await this.deleteGerenteUseCase.execute(id);
    console.log(`Gerente com ID ${id} deletado com sucesso`);
  }

  async encontrarGerentePorId(id: string): Promise<Gerente> {
    const gerente = await this.listByIdGerenteUseCase.execute(id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return gerente;
  }

  async adicionarClienteAoGerente(
    gerenteId: string,
    clienteId: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    const cliente = await this.findClienteByIdUseCase.execute(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }
    await this.addClienteToGerenteUseCase.execute(gerenteId, clienteId);
    console.log(
      `Cliente ${clienteId} adicionado ao gerente ${gerente.nomeCompleto}.`,
    );
  }

  async removerClienteDoGerente(
    gerenteId: string,
    clienteId: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    await this.removeClienteFromGerenteUseCase.execute(gerenteId, clienteId);
    console.log(
      `Cliente ${clienteId} removido do gerente ${gerente.nomeCompleto}.`,
    );
  }

  async abrirConta(
    gerenteId: string,
    clienteId: string,
    tipoConta: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    const cliente = await this.findClienteByIdUseCase.execute(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const createContaDto: CreateContaDto = {
      agencia: '0001',
      numero: '', // Será gerado pelo serviço de conta
      saldo: 0,
      tipoConta,
      limite: null,
      taxaJuros: null,
    };

    await this.contaService.create(createContaDto, clienteId); // Chama o método do ContaService
    console.log(`Conta do cliente ${clienteId} aberta com sucesso.`);
  }

  async fecharConta(
    gerenteId: string,
    clienteId: string,
    numeroConta: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    const cliente = await this.findClienteByIdUseCase.execute(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const contas = await this.contaService.listAll(clienteId);
    const conta = contas.find((c) => c.numero === numeroConta);

    if (!conta) {
      throw new NotFoundException(
        `Conta com número ${numeroConta} não encontrada para o cliente ${clienteId}.`,
      );
    }

    await this.contaService.delete(numeroConta);
    console.log(
      `Conta ${numeroConta} do cliente ${clienteId} fechada com sucesso.`,
    );
  }
}
