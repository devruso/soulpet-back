# SoulPet

Esta é uma API desenvolvida em linguagem de programação Back-end, voltado para gerenciamento de um petshop. O objetivo é oferecer uma solução para simplificar a gestão de informações relacionadas aos pets e seus proprietários.
Nesta API você vai poder, de forma simplificada, adicionar, atualizar, deletar e listar clientes, pets, produtos e serviços.

## Tecnologias utilizadas

|![](https://img.shields.io/badge/-JavaScript-black?logo=javascript&style=plastic)|![](https://img.shields.io/badge/-NodeJs-black?logo=nodedotjs&style=plastic)|![](https://img.shields.io/badge/-React-black?logo=react&style=plastic)|![](https://img.shields.io/badge/-Express-black?logo=express&style=plastic)|![](https://img.shields.io/badge/-Html-black?logo=html5&style=plastic)|
|---|---|---|---|---|
|![](https://img.shields.io/badge/-MySQL-black?logo=mysql&style=plastic)|![](https://img.shields.io/badge/-Postman-black?logo=postman&style=plastic)|![](https://img.shields.io/badge/-Git-black?logo=git&style=plastic)|![](https://img.shields.io/badge/-Bootstrap-black?logo=bootstrap&style=plastic)|![](https://img.shields.io/badge/-Css-black?logo=css3&style=plastic)

## Instalação

1. Clone este repositório: `https://github.com/devruso/soulpet-back.git`
2. Instale as dependências: `npm install`

## Como executar

1. Inicie o servidor: `npm start`
2. Acesse a página em seu navegador em: `http://localhost:3001`

## Funcionalidades

O programa SoulPet possui as seguintes funcionalidades:

- Cadastro de pets: permite o cadastro de animais, incluindo informações como nome, tipo, porte, data de nascimento e identificação do proprietário (cliente).
- Cadastro de clientes: permite o cadastro de clientes, incluindo informações como nome, endereço, telefone e e-mail.
- Registro de serviços: permite o registro de serviços realizados no petshop, como banho, tosa, vacinação, entre outros.
- Controle de produtos: possui um sistema de controle de estoque de produtos por categoria, como alimentação, medicamentos, higiene e brinquedos.
- Registro de agendamento: possui uma seção de agendamentos para inserção de um serviço em específico, de acordo com o pet, data e status.
- Controle de pedidos: há uma segmentação para controle de pedidos, que permite o cadastro de mesmo de acordo com quantidade, cliente e protudos solicitatos.

## Lista de endpoints da API

Aqui estão as rotas disponíveis, os recursos e os parâmetros necessários para realizar as operações.

- Clientes <br />

#### Consulta todos os clientes
```http
  GET /clientes
```

#### Consulta um cliente específico
```http
  GET /clientes/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Gera relatório em pdf de todos os clientes
```http
  GET /relatorio
```

#### Insere um novo cliente
```http
  POST /clientes
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**|
| `email` | `string` | **Obrigatório**|
| `telefone` | `string` | **Obrigatório**|
| `endereco` | `foreign_key` | **Obrigatório**|

#### Atualiza os dados de um cliente específico
```http
  PUT /clientes/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove um cliente
```http
  DELETE /clientes/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

- Pets <br />

#### Consulta todos os pets
```http
  GET /pets
```

#### Consulta um pet específico
```http
  GET /pets/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Consulta todos os pets de um cliente
```http
  GET /clientes/:clienteId/pets
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `clienteID` | `number` | **Obrigatório**|

#### Insere um novo pet
```http
  POST /pets
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**|
| `tipo` | `string` | **Obrigatório**|
| `porte` | `string` | **Obrigatório**|
| `dataNasc` | `date-only` | **Obrigatório**|

#### Atualiza os dados de um pet específico
```http
  PUT /pets/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove um pet
```http
  DELETE /pets/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

- Produtos <br />

#### Consulta todos os produtos
```http
  GET /produtos
```

#### Consulta um produto específico e contém o filtro de nome e categoria
```http
  GET /produtos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Insere um novo produto
```http
  POST /produtos
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**|
| `preco` | `string` | **Obrigatório**|
| `descricao` | `string` | **Obrigatório**|
| `desconto` | `string` | **Obrigatório**|
| `dataDesconto` | `dateOnly` | **Obrigatório**|
| `categoria` | `string` | **Obrigatório**|

#### Atualiza os dados de um produto específico
```http
  PUT /produtos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove um produto
```http
  DELETE /produtos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|


- Pedidos <br />

#### Consulta todos os pedidos
```http
  GET /pedidos
```

#### Consulta um pedido específico
```http
  GET /pedido/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Consulta todos os pedidos de acordo com id do produto
```http
  GET /pedidos/produtos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Consulta todos os pedidos de acordo com id do cliente
```http
  GET /pedidos/clientes/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Insere um novo pedido
```http
  POST /pedidos
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `codigo` | `string` | **Obrigatório**|
| `quantidade` | `integer` | **Obrigatório**|

#### Atualiza os dados de um pedido específico
```http
  PUT /pedido/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove um pedido
```http
  DELETE /pedido/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|


- Agendamento
#### Consulta todos os agendamentos
```http
  GET /agendamentos
```

#### Consulta um agendamento específico
```http
  GET /agendamentos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Insere um novo agendamento
```http
  POST /agendamentos
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `petId` | `number` | **Obrigatório**|
| `servicoId` | `number` | **Obrigatório**|
| `dataAgendada` | `dateOnly` | **Obrigatório**|
| `realizada` | `text` | **Obrigatório**|

#### Atualiza os dados de um agendamento específico
```http
  PUT /agendamentos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove um agendamento específico
```http
  DELETE /agendamentos/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

- Serviços <br />

#### Consulta todos os serviços
```http
  GET /servicos
```

#### Consulta um serviço específico
```http
  GET /servico/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Insere um novo serviço
```http
  POST /servicos
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**|
| `preco` | `string` | **Obrigatório**|

#### Atualiza os dados de um serviço específico
```http
  PUT /servico/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove um serviço
```http
  DELETE /servico/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**|

#### Remove todos os serviços
```http
  DELETE /servicos/all
```

## Como contribuir

Para contribuir com este projeto, siga estes passos:

1. Faça um fork deste repositório.
2. Crie uma nova branch: `git checkout -b nome-da-sua-branch`
3. Faça as alterações necessárias.
4. Faça um commit com as alterações: `git commit -m "Descreva as alterações realizadas"`
5. Faça um push para a branch: `git push origin nome-da-sua-branch`
6. Crie um pull request.

## Autoria

- JAMILSON PESTANA
- JULIA LOPES DA SILVA GASCHO
- SABRINA LOPES OLIVEIRA
- EURICO OLIVEIRA SANTOS JUNIOR
- CLAUDIO FILHO GONÇALVES MARTINS
- STEPHANY CANUTO DA SILVA

## Licença

Esta aplicação utiliza a Licença MIT, o que significa que você pode usá-la, copiá-la, modificar e distribuir o código esta aplicação, desde que seja mantida a atribuição de direitos autorais e a licença seja incluída em todas as cópias e modificações do código. Para obter mais informações sobre a Licença MIT, consulte o arquivo LICENSE.md na raiz deste repositório.