```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#cfa8ff', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#8128ed'}}}%%
classDiagram
    class Cliente {
        -string nomeCompleto
        -number rendaSalarial
        -Conta[] contasAssociadas
    }
    
    class Conta {
        -string agencia
        -string numero
        -number saldo
        -string tipoConta
        -number limite
        +depositar(valor: number): void
        +sacar(valor: number): boolean
        +transferir(destino: Conta, valor: number): boolean
        +verificarSaldo(valor: number): boolean
    }

    class Transacao {
        -string id
        -number valor
        -string tipo
        -Date data
    }
    
    class GerenciamentoDeContaService {
        +abrirConta(cliente: Cliente, tipoConta: string): void
        +fecharConta(cliente: Cliente, numeroConta: string): void
        +mudarTipoConta(cliente: Cliente, numeroConta: string, novoTipo: string): void
    }
    
    class ValidadorDeTransacaoService {
        +validarTransacao(transacao: Transacao): boolean
    }
    
    class ContaUseCase {
        +executar(): void
    }

    class TransacaoUseCase {
        +executar(): void
    }

    class ContaController {
        +depositar(req, res): void
        +sacar(req, res): void
        +transferir(req, res): void
    }

    class ClienteController {
        +abrirConta(req, res): void
        +fecharConta(req, res): void
        +mudarTipoConta(req, res): void
    }

    class TransacaoController {
        +criarTransacao(req, res): void
        +validarTransacao(req, res): void
    }
    
    class ContaRepository {
        +save(conta: Conta): void
        +findById(id: string): Conta
    }
    
    class ClienteRepository {
        +save(cliente: Cliente): void
        +findById(id: string): Cliente
    }
    
    class TransacaoRepository {
        +save(transacao: Transacao): void
        +findById(id: string): Transacao
    }
    
    class ContaRepositoryImpl {
        +save(conta: Conta): void
        +findById(id: string): Conta
    }
    
    class ClienteRepositoryImpl {
        +save(cliente: Cliente): void
        +findById(id: string): Cliente
    }
    
    class TransacaoRepositoryImpl {
        +save(transacao: Transacao): void
        +findById(id: string): Transacao
    }

    class ExternalServiceIntegration {
        +integrate(): void
    }

    Cliente --> Conta
    Conta --> Transacao
    GerenciamentoDeContaService --> Conta
    ValidadorDeTransacaoService --> Transacao
    ContaUseCase --> Conta
    TransacaoUseCase --> Transacao
    ContaController --> ContaUseCase
    ClienteController --> ContaUseCase
    TransacaoController --> TransacaoUseCase
    ContaRepositoryImpl --> ContaRepository
    ClienteRepositoryImpl --> ClienteRepository
    TransacaoRepositoryImpl --> TransacaoRepository
    ContaRepository --> Conta
    ClienteRepository --> Cliente
    TransacaoRepository --> Transacao
    ExternalServiceIntegration --> ContaRepositoryImpl
    ExternalServiceIntegration --> ClienteRepositoryImpl
    ExternalServiceIntegration --> TransacaoRepositoryImpl
