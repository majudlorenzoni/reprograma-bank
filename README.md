# Reprograma Bank

## Como Iniciar o Projeto
Para iniciar o projeto, siga estas instruções:

1. Abra um terminal e navegue até o diretório do projeto.

2. Verifique se você tem todas as dependências necessárias. Execute o comando: `npm install`

3. Uma vez que as dependências estiverem instaladas, execute o comando `npm run build` seguido de `npm start` para iniciar o projeto.
4. O servidor será iniciado e você poderá acessar a aplicação em seu navegador em http://localhost:3000.

Isso é tudo! Você iniciou o projeto com sucesso.

## Descrição dos Diretórios e Arquivos

- **src/**: Contém o código-fonte do projeto.
  - **controllers/**: Controladores que lidam com as requisições HTTP e chamam os serviços apropriados.
  - **models/**: Modelos de dados que representam as entidades do sistema, como Cliente, Conta, Conta Corrente, Conta Poupança e Gerente.
  - **routes/**: Define as rotas da API REST para cada entidade (Cliente, Conta e Gerente).
  - **services/**: Lógica de negócio e regras de manipulação de dados.
  - **index.ts**: Arquivo principal que inicializa o servidor e configura a aplicação.

- **node_modules/**: Contém as dependências do projeto instaladas pelo npm.
- **package.json**: Arquivo de configuração do npm que inclui metadados do projeto e as dependências.
- **tsconfig.json**: Arquivo de configuração do TypeScript.
- **README.md**: Este arquivo, que fornece uma visão geral do projeto, estrutura de pastas e informações importantes.

## Diagrama do Projeto

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

    class ContaCorrente {
        -number limiteChequeEspecial
    }
    
    class ContaPoupanca {
        -number taxaRendimento
    }
    
    class Gerente {
        -string nome
        +gerenciarCliente(cliente: Cliente): void
        +gerenciarConta(conta: Conta): void
    }
    
    class ClienteService {
        +buscarCliente(id: string): Cliente
        +listarContas(id: string): Conta[]
        +realizarTransacao(...)
    }
    
    class ContaService {
        +abrirConta(cliente: Cliente, tipoConta: string): void
        +fecharConta(cliente: Cliente, numeroConta: string): void
        +mudarTipoConta(cliente: Cliente, numeroConta: string, novoTipo: string): void
        +listarContas(cliente: Cliente): Conta[]
        +getContaByNumero(cliente: Cliente, numeroConta: string): Conta
        +depositar(conta: Conta, valor: number): void
        +sacar(conta: Conta, valor: number): boolean
        +transferir(origem: Conta, destino: Conta, valor: number): boolean
        +realizarPagamentoPIX(conta: Conta, valor: number): void
        +realizarPagamentoBoleto(conta: Conta, numeroBoleto: string, valor: number): void
    }
    
    class GerenteService {
        +adicionarGerente(gerente: Gerente): void
        +removerGerente(id: string): void
        +gerenciarCliente(cliente: Cliente): void
        +gerenciarConta(conta: Conta): void
    }
    
    class ClienteController {
        +listarContas(req, res): void
        +abrirConta(req, res): void
        +fecharConta(req, res): void
        +mudarTipoConta(req, res): void
    }

    class ContaController {
        +depositar(req, res): void
        +sacar(req, res): void
        +transferir(req, res): void
        +realizarPagamentoPIX(req, res): void
        +realizarPagamentoBoleto(req, res): void
    }

    class GerenteController {
        +adicionarGerente(req, res): void
        +removerGerente(req, res): void
        +gerenciarCliente(req, res): void
        +gerenciarConta(req, res): void
    }

    class AppModule {
        +imports: Module[]
    }
    
    class ClienteModule {
        +imports: Module[]
        +controllers: Controller[]
        +providers: Provider[]
    }

    class ContaModule {
        +imports: Module[]
        +controllers: Controller[]
        +providers: Provider[]
    }

    class GerenteModule {
        +imports: Module[]
        +controllers: Controller[]
        +providers: Provider[]
    }
    
    Cliente "1" --> "*" Conta
    Conta <|-- ContaCorrente
    Conta <|-- ContaPoupanca
    ClienteService --> Cliente
    ClienteService --> Conta
    ContaService --> Cliente
    ContaService --> Conta
    GerenteService --> Cliente
    GerenteService --> Conta
    Gerente "1" --> "*" Cliente
    ClienteController --> ClienteService
    ClienteController --> ContaService
    ContaController --> ContaService
    GerenteController --> GerenteService
    GerenteController --> ClienteService
    AppModule --> ClienteModule
    AppModule --> ContaModule
    AppModule --> GerenteModule
    ClienteModule --> ClienteController
    ClienteModule --> ClienteService
    ContaModule --> ContaController
    ContaModule --> ContaService
    GerenteModule --> GerenteController
    GerenteModule --> GerenteService
