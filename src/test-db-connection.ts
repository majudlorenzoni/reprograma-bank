import { DataSource } from 'typeorm';
import { Gerente } from './domain/entity/gerente.entity';
import { Cliente } from './domain/entity/cliente.entity';
import { Conta } from './domain/entity/conta.entity';
import { ContaCorrente } from './domain/entity/contaCorrente.entity';
import { ContaPoupanca } from './domain/entity/contaPoupanca.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'reprogramabank',
  username: 'reprograma8',
  password: 'repro',
  entities: [Gerente, Cliente, Conta, ContaCorrente, ContaPoupanca],
  synchronize: true,
});

async function runTests() {
  try {
    await AppDataSource.initialize();
    console.log('Banco de dados conectado com sucesso!');

    const gerenteRepository = AppDataSource.getRepository(Gerente);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const contaRepository = AppDataSource.getRepository(Conta);

    // Criando um Gerente
    const gerente = new Gerente('João Silva');
    const savedGerente = await gerenteRepository.save(gerente);

    // Criando um Cliente
    const cliente = new Cliente();
    cliente.nomeCompleto = 'Maria Souza';
    cliente.endereco = {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'Pelotas',
      cep: '96000-000',
      estado: 'RS',
    };
    cliente.telefone = '53999999999';
    cliente.rendaSalarial = 3500;
    cliente.gerente = savedGerente;
    const savedCliente = await clienteRepository.save(cliente);

    // Criando uma Conta Corrente
    const contaCorrente = new Conta();
    contaCorrente.cliente = savedCliente;
    contaCorrente.agencia = '0001';
    contaCorrente.numero = '123456-7';
    contaCorrente.saldo = 1000;
    contaCorrente.tipoConta = 'Conta Corrente';
    contaCorrente.limite = 2000;
    const savedContaCorrente = await contaRepository.save(contaCorrente);

    // Criando uma Conta Poupança
    const contaPoupanca = new Conta();
    contaPoupanca.cliente = savedCliente;
    contaPoupanca.agencia = '0001';
    contaPoupanca.numero = '765432-1';
    contaPoupanca.saldo = 5000;
    contaPoupanca.tipoConta = 'Conta Poupança';
    contaPoupanca.taxaJuros = 0.5;
    const savedContaPoupanca = await contaRepository.save(contaPoupanca);

    // Validando os resultados
    console.log('Gerente:', savedGerente);
    console.log('Cliente:', savedCliente);
    console.log('Conta Corrente:', savedContaCorrente);
    console.log('Conta Poupança:', savedContaPoupanca);
  } catch (error) {
    console.error('Erro durante a execução dos testes:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runTests();
