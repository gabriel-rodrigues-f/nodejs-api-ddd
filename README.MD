<h1 align="center">
    <p>TECH CHALLENGE FIAP - FASE 1</p>
</h1>
<p align="center">Arquitetura Hexagonal e Domain-Driven Design - CRUD</p>

Tópicos
=================
   * [Tecnologias](#tecnologias)
      * [Tecnologias utilizadas no projeto](#tecnologias-utilizadas-no-projeto)
   * [Serviços](#serviços)
   * [Getting started](#getting-started)
      * [Dependências de Produção](#dependências-de-produção)
      * [Dependências de desenvolvimetno](#dependências-de-desenvolvimento)
   * [Execute a aplicação](#execute-a-aplicação)
      * [Docker](#docker)
   * [Execute os teste](#execute-os-testes)


##  Tecnologias 

### Tecnologias utilizadas no projeto

* node            18.16.0
* npm             9.5.1
* docker          23.0.5
* docker-compose  2.23.0

##  Serviços

* Github

##  Getting started

### Dependências de Produção
  - bcrypt        5.1.1
  - cli-color     2.0.3
  - express       4.18.2
  - fast-glob     3.3.2
  - jsonwebtoken  9.0.2
  - mongodb       6.3.0
  - validator     13.11.0

### Dependências de Desenvolvimento
  - jest          29.7.0
  - supertest     6.3.3
  - mockdate      3.0.5
  - husky         8.3.0
  - lint-staged   15.2.0
  - rimraf        5.0.5
  - ts-jest       29.1.1
  - ts-node       10.9.2
  - typescript    5.3.3
  - module-alias  2.2.3
  - eslint                      7.32.0 || 8.2.0
    - eslint-config-airbnb-base 15.0.0
    - eslint-plugin-import      2.25.2
  - jest                        28.1.0
  
##  Execute a aplicação

### Docker
    - npm run up:locally - Realiza o build da imagem antes de executar
    - npm run up - Apenas executa a aplicação em Docker
    
### Execute os testes
    - npm run test - Executa todos os testes
    - npm run test:unit - Executa testes unitários
    - npm run test:integration - Executa testes de integração

## Rotas

### Login
  - [POST]  SignUp - Versão do cliente
  - [POST]  SignUp - Versão do administrador
  - [POST]  Login
  - [POST]  Logout

### Accounts
  - [GET] Consulta registro por CPF

### Products
  - [GET] Consulta Produtos
    - Retorna todos os produtos cadastrados
    - Habilitado para uso de query params
  - [POST]  [ADMIN] Criação de Produto
  - [PATCH] [ADMIN] Atualiza Produto
  - [DELETE]  [ADMIN] Deleta Produto

### Orders
  - [GET] Consulta Pedidos
    - Retorna todos os pedidos realizados
    - Habilitado para uso de query params
  - [POST]  Cria Pedido
  - [PATCH] Atualiza Pedido
