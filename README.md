# Reprograma Bank

![GitHub repo size](https://img.shields.io/github/repo-size/majudlorenzoni/reprograma-bank?style=for-the-badge)

![GitHub language count](https://img.shields.io/github/languages/count/majudlorenzoni/reprograma-bank?style=for-the-badge)

> Reprograma Bank é uma API REST desenvolvida com Nest.js e TypeORM, que simula operações bancárias como criação de contas, gerenciamento de clientes e realização de transações. Seguindo a Arquitetura Hexagonal, o projeto garante a separação de responsabilidades e facilita a manutenção e expansão do sistema.


## 💻 Pré-requisitos
Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do **Node.js**.
- Você instalou o **Nest.js CLI** globalmente.
- Você tem o **PostgreSQL** configurado e em execução.
- Você instalou todas as dependências do projeto usando `npm install`.

## 🚀 Instalando Reprograma Bank
- Clone o repositório na branch mais recente.
- Abra um terminal e navegue até o diretório do projeto.
- Uma vez que as dependências estiverem instaladas, execute o comando `npm run build` seguido de `npm start` para iniciar o projeto.
- O servidor será iniciado e você poderá acessar a aplicação em seu navegador em http://localhost:3000.


## Descrição dos Diretórios e Arquivos

## Estrutura de Diretórios e Arquivos

- **src/**: Diretório principal que contém todo o código-fonte do projeto.
  - **application/**: Contém a lógica de aplicação, incluindo os casos de uso do sistema.
    - **cliente/**: Implementa as funcionalidades relacionadas aos clientes.
        - **dto/**: Contém os Data Transfer Objects usados para transferir dados entre as camadas da aplicação.
        - **use-case/**: Diretório que contém os casos de uso, que implementam a lógica de negócios do projeto, como criação e gerenciamento de clientes.
        - **controllers/**: Contém os controladores que definem as rotas da API e interagem com os casos de uso, gerenciando requisições relacionadas aos clientes.
    - **conta/**: Implementa as funcionalidades relacionadas às contas.
        - **dto/**: Contém os Data Transfer Objects usados para transferir dados entre as camadas da aplicação.
        - **use-case/**: Diretório que contém os casos de uso, que implementam a lógica de negócios do projeto, como criação, fechamento e gerenciamento de contas.
        - **controllers/**: Contém os controladores que definem as rotas da API e interagem com os casos de uso, gerenciando requisições relacionadas às contas.
    - **gerente/**: Implementa as funcionalidades relacionadas aos gerentes.
        - **dto/**: Contém os Data Transfer Objects usados para transferir dados entre as camadas da aplicação.
        - **use-case/**: Diretório que contém os casos de uso, que implementam a lógica de negócios do projeto, como gerenciamento de gerentes e seus clientes.
        - **controllers/**: Contém os controladores que definem as rotas da API e interagem com os casos de uso, gerenciando requisições relacionadas aos gerentes.
    - **application.module.ts**: Módulo que agrupa e organiza os casos de uso e controladores do projeto na camada de aplicação.

  - **domain/**: Implementa os requisitos de negócio.
    - **entity/**: Contém as entidades do sistema, como `Conta`, `Cliente` e `Gerente`, que representam os modelos de dados principais.
    - **interfaces/**: Define as interfaces que estabelecem contratos entre as diferentes camadas do sistema, garantindo a separação de responsabilidades.
    - **modules/**: Define os módulos que agrupam a lógica de negócios relacionada, como `ClienteModule`, `ContaModule` e `GerenteModule`.
    - **services/**: Implementa a lógica de negócio e manipulação das entidades, como os serviços para criar e gerenciar contas e clientes.
    - **domain.module.ts**: Módulo que organiza e expõe os serviços e entidades na camada de domínio.

  - **infrastructure/**: Implementa as partes do sistema que fazem a ponte entre a lógica interna e os detalhes externos.
    - **repositories/**: Implementa a persistência de dados, conectando-se ao banco de dados e gerenciando as entidades.
    - **adapters/**: Contém os adaptadores que conectam o núcleo da aplicação a serviços externos, como o banco de dados e APIs.
    - **infrastructure.module.ts**: Módulo que organiza os repositórios e adaptadores na camada de infraestrutura.

  - **main.ts**: Arquivo de entrada principal do projeto, onde a aplicação Nest.js é iniciada.
  - **app.module.ts**: Módulo principal que importa e configura todos os outros módulos da aplicação, como aplicação, domínio e infraestrutura.

- **test/**: Contém os testes automatizados para as funcionalidades do sistema, organizados em pastas que correspondem às mesmas do `src`.

- **README.md**: Arquivo que contém a documentação do projeto, incluindo instruções de instalação, uso e contribuição.

- **package.json**: Arquivo de configuração que gerencia as dependências do projeto e scripts de execução.

- **tsconfig.json**: Arquivo de configuração do TypeScript, que define como o código TypeScript será compilado.

- **.gitignore**: Lista de arquivos e diretórios que não devem ser incluídos no controle de versão Git, como `node_modules/`, `.env`, entre outros.
