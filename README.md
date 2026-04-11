# Sistema de Gerenciamento de Estoque
 
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/yuribodo/a-base-vem-forte/blob/main/LICENSE)

Sistema completo para gerenciamento de estoque, com controle de produtos, vendas e movimentações, garantindo integridade dos dados e rastreabilidade das operações.

O projeto foi desenvolvido com foco em boas práticas de arquitetura, organização de código e aplicação de conceitos utilizados em sistemas reais de mercado.

---

## Visão Geral

A aplicação permite:

- Cadastro e gerenciamento de produtos
- Registro de vendas com múltiplos itens
- Controle de movimentações de estoque (entrada e saída)
- Garantia de integridade através de regras de negócio e transactions
- Rastreabilidade completa das operações realizadas

---

## Tecnologias Utilizadas

### Backend

- Node.js
- Express
- MySQL 

### Frontend

- Axios
- Tailwind CSS
- React
- React Icons
- React Router
- React Toastify
- React Lucide Icons

### Ferramentas

- Axios
- React Router
- React Toastify
- React Icons

---

## Arquitetura

O sistema segue o padrão de arquitetura em camadas (Layered Architecture):

routes → controllers → services → repositories → database

Responsabilidades:

- Routes: definição de endpoints HTTP
- Controllers: tratamento de requisição e resposta
- Services: regras de negócio e orquestração
- Repositories: acesso ao banco de dados
- Database: conexão e gerenciamento do pool

Essa estrutura garante:

- Separação de responsabilidades
- Baixo acoplamento
- Alta coesão
- Facilidade de manutenção e escalabilidade

---

## Principais Conceitos Aplicados

- REST API
- Transactions (MySQL)
- Soft Delete
- Padronização de respostas HTTP
- Validação de dados no service layer
- Async/Await
- Organização modular
- Conventional commits       

---

## Modelagem do Sistema

O sistema é baseado nas seguintes entidades:

- PRODUTOS
- VENDAS
- VENDA_ITENS
- MOVE_ESTOQUE

Características da modelagem:

- Separação entre venda e itens
- Movimentações independentes para rastreabilidade
- Histórico completo de operações
- Controle de estoque baseado em movimentações

---

## Regras de Negócio

- Produto não pode ter estoque negativo
- Venda só ocorre com estoque suficiente
- Estoque não é editado diretamente
- Toda movimentação altera o estoque
- Toda venda gera movimentação automática
- Produto não pode ser excluído (soft delete)
- Movimentações não podem ser alteradas
- Venda não pode ser editada após criação
- Preço de venda deve ser maior que o preço de compra

---

## Fluxos Principais

### Venda

- Criação inicial da venda
- Validação de produtos e estoque
- Registro dos itens
- Criação de movimentações de saída
- Atualização do estoque
- Atualização do valor total

### Produto

- Validação de dados
- Criação do produto
- Geração automática de movimentação de entrada

### Movimentação

- Validação do produto
- Atualização do estoque
- Registro da movimentação

---

## Padrão de Resposta da API

Todas as respostas seguem o padrão:

```json
{
  "message": "string",
  "data": {}
}
```

---

## Rotas da API

### Produtos

GET    /api/v1/produtos  
GET    /api/v1/produtos/:id  
POST   /api/v1/produtos  
PUT    /api/v1/produtos/:id  
DELETE /api/v1/produtos/:id  

### Vendas

GET    /api/v1/vendas  
GET    /api/v1/vendas/itens  
POST   /api/v1/vendas  
DELETE /api/v1/vendas/:id  

### Estoque / Movimentações

GET    /api/v1/estoque  
POST   /api/v1/estoque  

---

## Instalação

Consulte o guia completo:

[Guia de instalação](./docs/installation.md)


---

## Estrutura do Projeto

backend/api  
  ├── controllers  
  ├── services  
  ├── repositories  
  ├── middlewares 
  ├── routes  
  ├── validators  
  ├── utils  
  └── database  

frontend  
  ├── assets
  ├── components  
  ├── pages  
  ├── services
  ├── hooks
  ├── routes
  └── utils  

docs  
  ├── documentation.md  
  ├── installation.md  
  └── contributing.md  

---

## Decisões Técnicas

### Uso de Transactions

Transactions foram implementadas para garantir consistência em operações críticas como criação de vendas e produtos, evitando estados inválidos no banco de dados.

---

### Soft Delete

Produtos não são removidos fisicamente do banco, apenas desativados, preservando histórico e integridade referencial.

---

### Controle de Estoque por Movimentação

O estoque não é tratado como um valor editável diretamente, mas como resultado de movimentações, permitindo rastreabilidade completa e auditoria.

---

### Venda Imutável

Após criada, uma venda não pode ser alterada, garantindo consistência histórica das transações.

---

## Estado do Projeto

- Backend funcional
- CRUD completo implementado
- Transactions aplicadas
- Soft delete implementado
- Scripts de seed e reset disponíveis
- Documentação estruturada
- Frontend em desenvolvimento

---

## Próximos Passos

- Implementação de testes automatizados
- Integração completa com frontend
- Documentação de API com Swagger

---

## Documentação completa

[Documentação completa](./docs/documentation.md)

## Licença

Este projeto está sob a licença MIT.
