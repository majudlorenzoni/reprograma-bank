import { Cliente } from './cliente';
import { Gerente } from './gerente';
import { ContaPoupanca } from './contaPoupanca';
import { ContaCorrente } from './contaCorrente';

// Criando um cliente
const cliente = new Cliente(
  'João Silva',
  {
    rua: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    cep: '01000-000',
    estado: 'SP'
  },
  '11999998888', // telefone
  new Gerente('Maria Souza'), // gerente
  [], // contas associadas (começa vazio)
  5000 // renda salarial
);

// Criando uma conta poupança e depositando 400 reais
const contaPoupanca = new ContaPoupanca(cliente, '001', '001-001', 0, 'poupanca', 0.5);
contaPoupanca.depositar(400);

// Abrindo uma conta corrente para o mesmo cliente
const contaCorrente = new ContaCorrente(cliente, '001', '001-002', 0, 'corrente', 1000);

// Transferindo 300 reais da poupança para a corrente
contaPoupanca.transferir(contaCorrente, 300);

// Criando um novo gerente
const gerente = new Gerente('Ana Oliveira');

// Criando um novo cliente
const novoCliente = new Cliente(
  'Maria Santos',
  {
    rua: 'Rua dos Girassóis',
    numero: '456',
    bairro: 'Jardim Primavera',
    cidade: 'Rio de Janeiro',
    cep: '20000-000',
    estado: 'RJ'
  },
  '21999997777', // telefone
  gerente, // gerente
  [], // contas associadas (começa vazio)
  6000 // renda salarial
);

// Abrindo uma conta corrente para o novo cliente
gerente.abrirConta(novoCliente, 'corrente');

// Abrindo uma conta poupança para o novo cliente
gerente.abrirConta(novoCliente, 'poupanca');

// Fechando a conta poupança do cliente
const contaPoupancaCliente = novoCliente.contasAssociadas.find(conta => conta.tipoConta === 'poupanca');
if (contaPoupancaCliente) {
  gerente.fecharConta(novoCliente, contaPoupancaCliente);
} else {
  console.log('Conta poupança não encontrada para fechar.');
}