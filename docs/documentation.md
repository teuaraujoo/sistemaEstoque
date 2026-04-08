 # Sistema de Gerenciamento de Estoque

Sistema de gerenciamento de estoque com cadastro de produtos, vendas e movimentações, desenvolvido para controle de mercadorias e registro de operações.

A aplicação foi desenvolvida utilizando arquitetura em camadas (Layered Architecture), separando responsabilidades entre controllers, services e repositories, garantindo organização, escalabilidade e manutenção facilitada.

Projeto prático voltado para desenvolvimento fullstack e fortalecimento de portfólio.

---

## 2. Tecnologias e Stacks

### 2.1 Backend

- Node.js
- Express
- MySQL
- mysql2/promise (pool de conexões)
- JWT
- Bcrypt

### 2.2 Frontend

- React
- Tailwind CSS

### 2.3 Ferramentas

- Axios
- React Router
- React Icons
- React Toastify
- React Lucide Icons

### 2.4 Conceitos Aplicados

- Arquitetura em Camadas (Layered Architecture)
- REST API
- Transactions (MySQL)
- Soft Delete
- Separação de responsabilidades
- Padronização de respostas HTTP
- Conventional Commits

---

## 3. Estrutura de pastas

```
SISTEMAESTOQUE/
├── backend/
│   └── api/
│       ├── node_modules/
│       ├── src/
│       │   ├── controllers/
│       │   ├── database/
│       │   ├── middlewares/
│       │   ├── repositories/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── utils/
│       │   └── validators/
│       ├── .env
│       ├── index.js
│       ├── package.json
│       └── yarn.lock
├── docs/
│   ├── contributing.md
│   ├── documentation.md
│   └── installation.md
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── yarn.lock
├── .gitignore
├── aprendizados.txt
├── documentação.txt
├── LICENSE.md
└── README.md
```

## 4. Regras de Negócio

- Preço de venda deve ser maior que o preço de compra
- Produto não pode ter estoque negativo
- Venda só ocorre se houver estoque suficiente
- Saída de estoque exige quantidade disponível
- Nome do produto deve ser string
- Movimentação gerada por venda tem tipo e motivo fixos (SAIDA /VENDA MERCADORIA)
- Não é permitido excluir movimentações de estoque
- Correções de estoque devem ser feitas por meio de nova movimentação compensatória
- Produto não pode ser excluído, apenas desativado (soft delete)
- Produto deve existir para realizar venda
- Venda não pode ser atualizada
- Movimentação não pode ser atualizada
- Edição de estoque do produto exige criar uma movimentação (não pode ser editado diretamente)
- Novo produto gera movimentação automática (ENTRADA / NOVAS MERCADORIAS) caso seja adicionado com estoque maior que zero

---

## 5. Estrutura do Banco de Dados

### 5.1 PRODUTOS

```sql
ID           INT AUTO_INCREMENT PRIMARY KEY,
NOME         VARCHAR(50) NOT NULL,
DESCRICAO    VARCHAR(150),
PRECO_COMPRA DECIMAL(5, 2) NOT NULL,
PRECO_VENDA  DECIMAL(5, 2) NOT NULL,
QTD_ESTOQUE  INT NOT NULL,
STATUS       ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO',
CREATED_AT   DATETIME DEFAULT NOW(),
UPDATED_AT   DATETIME DEFAULT NOW() ON UPDATE NOW()
```

### 5.2 VENDAS

```sql
ID          INT AUTO_INCREMENT PRIMARY KEY,
VALOR_TOTAL DECIMAL(6, 2),
DATA_VENDA  DATETIME DEFAULT NOW(),
UPDATED_AT  DATETIME DEFAULT NOW() ON UPDATE NOW()
```

### 5.3 VENDA_ITENS

```sql
ID             INT AUTO_INCREMENT PRIMARY KEY,
VENDA_ID       INT NOT NULL,
PRODUTO_ID     INT NOT NULL,
NOME_PRODUTO VARCHAR(50),
QUANT          INT NOT NULL,
PRECO_UNITARIO DECIMAL(5, 2) NOT NULL,
VALOR_TOTAL    DECIMAL(6, 2) NOT NULL,
CREATED_AT     DATETIME DEFAULT CURRENT_TIMESTAMP,
UPTATED_AT     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

### 5.4 MOVE_ESTOQUE

```sql
ID         INT AUTO_INCREMENT PRIMARY KEY,
PRODUTO_ID INT NOT NULL,
NOME_PRODUTO VARCHAR(50),
TIPO       ENUM("ENTRADA", "SAIDA") NOT NULL,
MOTIVO     VARCHAR(50),
QTD        INT NOT NULL,
VENDA_ID   INT NULL,
CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

### 5.5 USUARIOS

```sql
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NOME VARCHAR(100) NOT NULL,
  EMAIL VARCHAR(100) NOT NULL UNIQUE,
  SENHA_HASH VARCHAR(255) NOT NULL,
  CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
  UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

### 5.6 Relacionamentos

- Produto → Vendas (1:N)
- Produto → Movimentações (1:N)
- Venda → Itens
- Venda → Movimentações
- Venda Itens → Produto
- Movimentação → Produto e Venda

---

## 6. Fluxos do Sistema

### 6.1 Venda

```
Cria venda (valor 0)
  → valida produto e estoque
  → calcula subtotal e total
  → registra item
  → cria movimentação (SAÍDA)
  → atualiza estoque do produto
  → atualiza valor da venda
```

### 6.2 Movimentação de Estoque

```
Busca produto
  → valida status e quantidade
  → atualiza estoque
  → registra movimentação
```

### 6.3 Criação de Produto

```
Valida dados
  → cria produto
  → cria movimentação (ENTRADA)
```

### 6.4 Regras Globais

- Toda venda gera uma movimentação automática
- Todo produto criado com estoque maior que 0 gera movimentação

---

## 7. Rotas da API

### 7.1 Estoque

```
GET    /api/v1/estoque
POST   /api/v1/estoque
DELETE /api/v1/estoque/:id
```

### 7.2 Produtos

```
GET    /api/v1/produtos
GET    /api/v1/produtos/:id
POST   /api/v1/produtos
PUT    /api/v1/produtos/:id
DELETE /api/v1/produtos/:id
```

### 7.3 Vendas

```
GET    /api/v1/vendas
GET    /api/v1/vendas/itens
POST   /api/v1/vendas
DELETE /api/v1/vendas/:id
```

---

## 8. Padrões de Requisição e Resposta

### 8.1 Estrutura padrão

```json
{
  "message": "string",
  "data": {}
}
```

### 8.2 Exemplos


### 8.3 Vendas

#### 8.3.1 GET

```json
[
    {
        "ID": 1,
        "VALOR_TOTAL": "300.00",
        "DATA_VENDA": "2026-03-25T21:37:09.000Z",
        "UPDATED_AT": "2026-03-25T21:37:09.000Z"
    },
    {
        "ID": 2,
        "VALOR_TOTAL": "1000.00",
        "DATA_VENDA": "2026-03-26T02:22:36.000Z",
        "UPDATED_AT": "2026-03-26T02:22:36.000Z"
    }
]
```

---

#### 8.3.2 GET Itens

```json
[
    {
        "ID": 1,
        "VENDA_ID": 1,
        "PRODUTO_ID": 1,
        "QUANT": 2,
        "PRECO_UNITARIO": "50.00",
        "VALOR_TOTAL": "100.00",
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPTATED_AT": "2026-03-25T21:37:09.000Z"
    },
    {
        "ID": 2,
        "VENDA_ID": 1,
        "PRODUTO_ID": 2,
        "QUANT": 1,
        "PRECO_UNITARIO": "200.00",
        "VALOR_TOTAL": "200.00",
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPTATED_AT": "2026-03-25T21:37:09.000Z"
    },
    {
        "ID": 3,
        "VENDA_ID": 2,
        "PRODUTO_ID": 1,
        "QUANT": 4,
        "PRECO_UNITARIO": "50.00",
        "VALOR_TOTAL": "200.00",
        "CREATED_AT": "2026-03-26T02:22:36.000Z",
        "UPTATED_AT": "2026-03-26T02:22:36.000Z"
    },
    {
        "ID": 4,
        "VENDA_ID": 2,
        "PRODUTO_ID": 2,
        "QUANT": 4,
        "PRECO_UNITARIO": "200.00",
        "VALOR_TOTAL": "800.00",
        "CREATED_AT": "2026-03-26T02:22:36.000Z",
        "UPTATED_AT": "2026-03-26T02:22:36.000Z"
    }
]
```

---

#### 8.3.3 Criar venda

**Requisição:**

```json
{
    "itens": [
        {
            "PRODUTO_ID": 53,
            "QUANT": 4
        },
        {
            "PRODUTO_ID": 2,
            "QUANT": 4
        }
    ]
}
```

**Resposta:**

```json
{
    "message": "Venda criada com sucesso!",
    "data": {
        "ID": 2,
        "VALOR_TOTAL": "1000.00",
        "DATA_VENDA": "2026-03-26T02:22:36.000Z",
        "UPDATED_AT": "2026-03-26T02:22:36.000Z"
    }
}
```

---

### 8.4 Produto

#### 8.4.1 GET

```json
[
    {
        "ID": 1,
        "NOME": "MousePad gamer preto 23",
        "DESCRICAO": "TESTANDO",
        "PRECO_COMPRA": "70.00",
        "PRECO_VENDA": "150.00",
        "QTD_ESTOQUE": 4,
        "STATUS": "ATIVO",
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPDATED_AT": "2026-03-26T02:25:38.000Z"
    },
    {
        "ID": 2,
        "NOME": "Tênis",
        "DESCRICAO": "Tênis esportivo",
        "PRECO_COMPRA": "100.00",
        "PRECO_VENDA": "200.00",
        "QTD_ESTOQUE": 0,
        "STATUS": "ATIVO",
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPDATED_AT": "2026-03-26T02:22:36.000Z"
    },
    {
        "ID": 3,
        "NOME": "MousePad gamer preto 23",
        "DESCRICAO": "TESTANDO",
        "PRECO_COMPRA": "50.00",
        "PRECO_VENDA": "150.00",
        "QTD_ESTOQUE": 15,
        "STATUS": "ATIVO",
        "CREATED_AT": "2026-03-26T02:23:11.000Z",
        "UPDATED_AT": "2026-03-26T02:24:23.000Z"
    }
]
```

---

#### 8.4.2 Criar produto

**Requisição:**

```json
{
    "NOME": "MousePad gamer preto 23",
    "DESCRICAO": "TESTANDO",
    "PRECO_COMPRA": 50.00,
    "PRECO_VENDA": 150.00,
    "QTD_ESTOQUE": 10
}
```

**Resposta:**

```json
{
    "message": "Produto cadastrado com sucesso!",
    "data": {
        "ID": 3,
        "NOME": "MousePad gamer preto 23",
        "DESCRICAO": "TESTANDO",
        "PRECO_COMPRA": "50.00",
        "PRECO_VENDA": "150.00",
        "QTD_ESTOQUE": 10,
        "STATUS": "ATIVO",
        "CREATED_AT": "2026-03-26T02:23:11.000Z",
        "UPDATED_AT": "2026-03-26T02:23:11.000Z"
    }
}
```

---

#### 8.4.3 Atualizar produto

**Requisição:**

```json
{
    "NOME": "MousePad gamer preto 23",
    "DESCRICAO": "TESTANDO",
    "PRECO_COMPRA": 70.00,
    "PRECO_VENDA": 150.00,
    "QTD_ESTOQUE": 10
}
```

**Resposta:**

```json
{
    "message": "Produto atualizado com sucesso!",
    "data": {
        "ID": 1,
        "NOME": "MousePad gamer preto 23",
        "DESCRICAO": "TESTANDO",
        "PRECO_COMPRA": "70.00",
        "PRECO_VENDA": "150.00",
        "QTD_ESTOQUE": 4,
        "STATUS": "ATIVO",
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPDATED_AT": "2026-03-26T02:25:38.000Z"
    }
}
```

---

### 8.5 Movimentação de Estoque

#### 8.5.1 GET

```json
[
    {
        "ID": 1,
        "PRODUTO_ID": 1,
        "TIPO": "ENTRADA",
        "MOTIVO": "COMPRA FORNECEDOR",
        "QTD": 10,
        "VENDA_ID": null,
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPDATED_AT": "2026-03-25T21:37:09.000Z"
    },
    {
        "ID": 2,
        "PRODUTO_ID": 2,
        "TIPO": "ENTRADA",
        "MOTIVO": "COMPRA FORNECEDOR",
        "QTD": 5,
        "VENDA_ID": null,
        "CREATED_AT": "2026-03-25T21:37:09.000Z",
        "UPDATED_AT": "2026-03-25T21:37:09.000Z"
    }
]
```

---

#### 8.5.2 Criar movimentação

**Requisição:**

```json
{
    "PRODUTO_ID": 3,
    "TIPO": "ENTRADA",
    "MOTIVO": "COMPRA FORNECEDOR",
    "QTD": 5,
    "VENDA_ID": null
}
```

**Resposta:**

```json
{
    "message": "Movimentação cadastrada com sucesso!",
    "data": {
        "ID": 8,
        "PRODUTO_ID": 3,
        "TIPO": "ENTRADA",
        "MOTIVO": "COMPRA FORNECEDOR",
        "QTD": 5,
        "VENDA_ID": null,
        "CREATED_AT": "2026-03-26T02:24:23.000Z",
        "UPDATED_AT": "2026-03-26T02:24:23.000Z"
    }
}
```
## 9. Instalação

👉 Consulte o arquivo:

[Guia de instalação](./installation.md)

---

## 10. Execução

Fluxo recomendado:

##### backend

```bash
cd backend/api
yarn install
yarn db:reset
yarn db:seed
yarn start
```
##### frontend

```bash
cd ../../frontend
yarn install
yarn run dev
```
---

## 11. Debug e Problemas Comuns

- Verificar conexão com banco
- Verificar variáveis de ambiente
- Verificar ordem das operações (transactions)
- Garantir uso correto de connection em transações

---

## 12. Recursos Adicionais

| Arquivo              | Descrição              |
| -------------------- | ---------------------- |
| `README.md`          | Visão geral do projeto |
| `docs/documentation` | Documentação completa  |
| `docs/installation`  | Instalação             |
| `docs/contributing`  | Contribuição           |

---

## 13. Licença

Este projeto utiliza licença **MIT**.

O arquivo `LICENSE` define como o código pode ser utilizado, modificado e distribuído.