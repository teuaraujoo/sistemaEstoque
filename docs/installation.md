# ⚙️ Guia de Instalação

Este guia descreve como configurar e executar o sistema de gerenciamento de estoque localmente.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior recomendada)
- Yarn ou NPM
- MySQL Server
- Git

---

## 📁 Clonando o repositório

```bash
git clone <[URL_DO_REPOSITORIO](https://github.com/teuaraujoo/sistemaEstoque.git)>
cd sistemaEstoque
```

---

## 🗄️ Configuração do Banco de Dados

1. Crie um banco de dados MySQL:

```sql
CREATE DATABASE estoque;
```

2. Configure as variáveis de ambiente no backend:

Crie um arquivo `.env` em:

```
backend/api/.env
```

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=estoque
DB_PORT=3306
```

---

## 🚀 Instalação e Execução

### 🔹 Backend

```bash
cd backend/api

# instalar dependências
yarn install

# resetar banco (limpa todas as tabelas)
yarn db:reset

# popular banco com dados iniciais
yarn db:seed

# iniciar servidor
yarn start
```

Servidor rodando em:

```
http://localhost:PORTA
```

---

### 🔹 Frontend

```bash
cd ../../frontend

# instalar dependências
yarn install

# iniciar aplicação
yarn run dev
```

Frontend disponível em:

```
http://localhost:PORTA
```

---

## 🔄 Fluxo Recomendado

Sempre que iniciar o projeto:

1. Iniciar o backend
2. Iniciar o frontend
3. Garantir que o banco esteja configurado corretamente

---

## 🧪 Scripts Disponíveis (Backend)

```bash
yarn db:reset   # limpa o banco
yarn db:seed    # popula com dados iniciais
yarn start      # inicia o servidor
```

---

## ⚠️ Problemas Comuns

### ❌ Erro de conexão com banco
- Verifique se o MySQL está rodando
- Confira usuário, senha e porta no `.env`

---

### ❌ Tabelas não existem
- Execute novamente:

```bash
yarn db:reset
yarn db:seed
```

---

### ❌ Porta já em uso
- Altere a porta no backend ou finalize o processo que está usando

---

### ❌ Erros em transações
- Verifique se todas operações estão usando a mesma conexão (`connection`)

---

## 📌 Observações Importantes

- O sistema utiliza **transactions**, portanto erros durante operações críticas resultam em rollback automático
- O banco pode ser resetado sem afetar a estrutura do projeto
- O frontend depende do backend em execução

---

## ✅ Ambiente pronto!

Se tudo estiver correto, você poderá:

- Criar produtos
- Realizar vendas
- Visualizar movimentações de estoque

---