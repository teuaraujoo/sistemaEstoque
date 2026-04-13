# Aprendizados do Projeto

## Arquitetura e Organização

- Estrutura em camadas (Layered Architecture)
- Separação de responsabilidades:
  - controllers
  - services
  - repositories
- Organização de projeto profissional
- Diferença entre MVC e arquitetura em camadas

### Fluxo da aplicação


routes → controllers → services → repositories → database


---

## Backend e API

- Criação de API REST
- Padrão de rotas:
  - GET
  - POST
  - PUT
  - DELETE

### Status HTTP

- 200 → sucesso
- 201 → criado
- 400 → erro do cliente
- 500 → erro do servidor

- Padronização de respostas da API
- Estrutura de requisição JSON
- Comunicação frontend ↔ backend (arrays, objetos)

---

## Autenticação e Segurança

### Conceitos

- Bearer Token: credencial usada para autenticação em APIs
- JWT (JSON Web Token):
  - gerado no login
  - enviado no header das requisições
- JWT_SECRET:
  - chave privada da aplicação
  - usada para assinar e validar tokens

### AuthN vs AuthZ

- AuthN (Autenticação) → quem você é
- AuthZ (Autorização) → o que você pode fazer

---

## Web Storage

- localStorage → persiste mesmo após fechar o navegador
- sessionStorage → apagado ao fechar o navegador

---

## Segurança de API

### 1. Rate Limiting

- Limite de requisições por usuário
- Protege contra ataques como DDoS

### 2. CORS

- Controla quais URLs podem acessar sua API
- Permite restringir apenas ao frontend

### 3. XSS (Cross-Site Scripting)

- Injeção de scripts maliciosos
- Pode roubar dados (ex: tokens no localStorage)

### 4. SQL Injection

- Inserção de comandos SQL maliciosos
- Manipulação indevida do banco

---

## Banco de Dados (MySQL)

- Modelagem relacional
- Uso de foreign keys
- Relacionamentos (1:N)
- Uso de insertId

### Diferenças importantes

- TRUNCATE → limpa tabela rapidamente (reset total)
- DELETE → remove registros com mais controle

### Integridade de dados

- Garantia de consistência entre tabelas

---

## Conexão com Banco

### Pool vs Connection

- createPool → gerencia múltiplas conexões
- getConnection() → pega conexão específica
- release() → devolve ao pool

---

## Transactions

- beginTransaction
- commit
- rollback

### Aprendizados

- Evita dados inconsistentes
- Agrupa operações
- Resolve problemas reais de sistema

---

## Scripts de Banco

- seed → popular banco
- reset → limpar banco
- Execução via package.json

---

## Deploy e Ambientes

- Configuração de variáveis de ambiente
- Identificação e tratamento de erros em produção

### Ambientes

- desenvolvimento
- produção

---

## Backend vs Banco (Conceito de Acesso)

### API (Backend)

- URL pública
- HTTP/HTTPS
- Acessada por:
  - frontend
  - usuários
  - Postman

### Banco de Dados

- Conexão TCP
- Não é público
- Acessado apenas pela API

### TCP Proxy

- Permite acesso ao banco externamente

### DATABASE_URL

Contém:
- user
- host
- port
- database

---

## Frontend (React)

### Setup

- React com Vite

#### Tailwind


yarn add tailwindcss @tailwindcss/vite
- Configuração do Tailwind (tailwind.config.js)
- Importação no index.css
- Uso das classes CSS do Tailwind nos componentes

### Estrutura

- main.jsx → entrada da aplicação
- App.jsx → raiz da interface

---

## Conceitos React

### Lifting State Up

- Estado deve ficar no nível mais alto necessário

Exemplo:
- Pai controla o estado
- Filho recebe via props

### Props

- Dados ou funções passadas do pai para o filho

### Estado

- Controla comportamento e renderização

---

## Boas Práticas React

### Eventos

Correto:


onClick={handleClick}
onClick={() => handleClick(param)}


Errado:


onClick={handleClick(param)}


### Formulários

- Botão sem type dentro de form vira submit por padrão

---

## Operadores JavaScript

- || → considera valores falsy (0, '', false, null, undefined)
- ?? → considera apenas null ou undefined

- ?? é mais seguro para valores padrão

---

## Refatoração

- Quebrar funções grandes
- Aplicar SRP (Single Responsibility Principle)
- Melhorar organização dos services

---

## Git e Versionamento

### Conventional Commits

Formato:


<type>(scope): descrição


### Tipos

- feat → nova funcionalidade
- fix → correção
- refactor → melhoria interna
- chore → tarefas auxiliares
- docs → documentação

### Exemplo


refactor(vendas): aplica transaction no fluxo de criação de vendas


Descrição:
- detalhada
- explicando o impacto

---

## Documentação

### Estrutura

- README.md → visão geral
- documentation/ → documentação completa
- installation.md → instalação
- usage.md → uso
- advanced.md → casos avançados
- CONTRIBUTING.md → contribuição
- CODE_OF_CONDUCT.md → conduta
- LICENSE → licença (MIT)

---

## Observações Gerais

- Sempre escrever commits claros e descritivos
- Separar bem responsabilidades no código
- Pensar em segurança desde o início
- Organizar projeto como produto real