import { Cliente } from '../models/cliente.model';
import { Gerente } from '../models/gerente.model';
import { ContaService } from './conta.service';

export class GerenteService {
  private gerentes: Gerente[] = [];
  
  constructor(private readonly contaService: ContaService) {}

  adicionarGerente(nomeCompleto: string): Gerente {
    const novoGerente = new Gerente(nomeCompleto);
    this.gerentes.push(novoGerente);
    return novoGerente;
  }

  listarGerentes(): Gerente[] {
    return this.gerentes
  }
  
  encontrarGerentePorId(id: string): Gerente | undefined {
    return this.gerentes.find((gerente) => gerente.getId() === id);
  }

  adicionarClienteGerente(gerente: Gerente, cliente: Cliente): void {
    gerente.clientes.push(cliente);
    console.log(
      `Cliente ${cliente.getIdCliente()} adicionado ao gerente ${gerente.nomeCompleto}.`,
    );
  }

  removerCliente(gerente: Gerente, idCliente: string): void {
    const index = gerente.clientes.findIndex(
      (cliente) => cliente.getIdCliente() === idCliente,
    );
    if (index !== -1) {
      gerente.clientes.splice(index, 1);
      console.log(
        `Cliente ${idCliente} removido do gerente ${gerente.nomeCompleto}.`,
      );
    } else {
      console.log(
        `Cliente ${idCliente} não encontrado no gerente ${gerente.nomeCompleto}.`,
      );
    }
  }

  abrirConta(gerente: Gerente, cliente: Cliente, tipoConta: string): void {
    this.contaService.abrirConta(cliente, tipoConta);
  }

  fecharConta(gerente: Gerente, cliente: Cliente, numeroConta: string): void {
    this.contaService.fecharConta(cliente, numeroConta);
  }

  mudarTipoConta(
    gerente: Gerente,
    cliente: Cliente,
    numeroConta: string,
    novoTipo: string,
  ): void {
    this.contaService.mudarTipoConta(cliente, numeroConta, novoTipo);
  }
}
