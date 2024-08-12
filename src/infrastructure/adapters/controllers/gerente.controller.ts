import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GerenteService } from '../../../domain/services/gerente.service';
import { CreateGerenteDto } from '../../../application/gerente/dto/create-gerente.dto';
import { UpdateGerenteDto } from '../../../application/gerente/dto/update-gerente.dto';
import { Gerente } from '../../../domain/entities/gerente.entity';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  async criarGerente(
    @Body() createGerenteDto: CreateGerenteDto,): Promise<{ gerente: Gerente }> {
    const novoGerente = await this.gerenteService.criarGerente(createGerenteDto);
    return { gerente: novoGerente };
  }

  @Get()
  async listarGerentes(): Promise<{ gerentes: Gerente[] }> {
    const gerentes = await this.gerenteService.listarGerentes();
    return { gerentes };
  }

  @Get(':idGerente')
  async encontrarGerentePorId(
    @Param('idGerente') idGerente: string,
  ): Promise<{ gerente: Gerente }> {
    const gerente = await this.gerenteService.encontrarGerentePorId(idGerente);
    return { gerente };
  }

  @Patch(':idGerente')
  async atualizarGerente(
    @Param('idGerente') idGerente: string,
    @Body() updateGerenteDto: UpdateGerenteDto,
  ): Promise<{ gerente: Gerente }> {
    const gerenteAtualizado = await this.gerenteService.atualizarGerente(
      idGerente,
      updateGerenteDto,
    );
    return { gerente: gerenteAtualizado };
  }

  @Delete(':idGerente')
  async deletarGerente(@Param('idGerente') idGerente: string): Promise<{ message: string }> {
    await this.gerenteService.deletarGerente(idGerente);
    return { message: `Gerente com ID ${idGerente} deletado com sucesso.` };
  }

  @Post(':idGerente/clientes/:idCliente')
  async adicionarClienteAoGerente(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
  ): Promise<{ message: string }> {
    await this.gerenteService.adicionarClienteAoGerente(idGerente, idCliente);
    return {
      message: `Cliente ${idCliente} adicionado ao gerente ${idGerente}.`,
    };
  }

  @Delete(':idGerente/clientes/:idCliente')
  async removerClienteDoGerente(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
  ): Promise<{ message: string }> {
    await this.gerenteService.removerClienteDoGerente(idGerente, idCliente);
    return {
      message: `Cliente ${idCliente} removido do gerente ${idGerente}.`,
    };
  }

  @Post(':idGerente/clientes/:idCliente/contas')
  async abrirConta(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
    @Body() body: { tipoConta: string },
  ): Promise<{ message: string }> {
    await this.gerenteService.abrirConta(idGerente, idCliente, body.tipoConta);
    return {
      message: `Conta do cliente ${idCliente} aberta com sucesso pelo gerente ${idGerente}.`,
    };
  }

  @Delete(':idGerente/clientes/:idCliente/contas/:numeroConta')
  async fecharConta(
    @Param('idGerente') idGerente: string,
    @Param('idCliente') idCliente: string,
    @Param('numeroConta') numeroConta: string,
  ): Promise<{ message: string }> {
    await this.gerenteService.fecharConta(idGerente, idCliente, numeroConta);
    return {
      message: `Conta ${numeroConta} do cliente ${idCliente} fechada com sucesso pelo gerente ${idGerente}.`,
    };
  }
}
