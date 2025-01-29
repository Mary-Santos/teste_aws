# Client Registration CRUD - AWS Serverless API

Este projeto implementa um sistema de cadastro de clientes com operações CRUD (Create, Read, Update, Delete) utilizando a arquitetura serverless com AWS Lambda, API Gateway e DynamoDB. A aplicação foi desenvolvida com **Node.js** (v22.x) e **TypeScript**.

## Requisitos

- **Node.js** (v16.x ou superior)
- **AWS CLI** configurado com as credenciais adequadas
- **Serverless Framework** instalado globalmente
- **DynamoDB Local** (para testes locais)
- **Docker** (para rodar DynamoDB Local)
- **npm** ou **yarn** (gerenciador de pacotes)

### Instalação

1. **Clone o repositório**

Instale as dependências do projeto

Caso esteja utilizando npm:

```bash
npm install
```
Ou caso prefira yarn:

```bash
yarn install
```
Instale o Serverless Framework (se não estiver instalado)

Caso não tenha o Serverless Framework instalado, você pode instalá-lo globalmente com o seguinte comando:

```bash
npm install -g serverless
```
Configuração do AWS CLI
Para configurar as credenciais da AWS:

Execute o comando abaixo e forneça sua chave de acesso e chave secreta:

```bash
aws configure
```
Insira sua Access Key ID, Secret Access Key, Default region name (exemplo: us-east-1) e Default output format (json).

Executando o DynamoDB Local (opcional, para testes locais)
O DynamoDB Local pode ser executado para simular o banco de dados na sua máquina local.

Certifique-se de ter o Docker instalado e execute o comando abaixo para rodar o DynamoDB Local:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```
Inicie a tabela DynamoDB localmente para testes:

Você pode usar o AWS CLI para criar a tabela DynamoDB localmente.

```bash
aws --endpoint-url http://localhost:8000 dynamodb create-table \
    --table-name Clients \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

Variáveis de Configuração
A aplicação não requer variáveis de ambiente complexas, pois o Serverless Framework irá gerenciar automaticamente os recursos da AWS para você.

Rodando o Projeto Localmente
Para rodar localmente utilizando o Serverless Framework e o DynamoDB Local:

```bash
serverless offline start
```
Isso vai iniciar o servidor local e você poderá fazer requisições para http://localhost:3000 utilizando uma ferramenta como o Postman ou Insomnia.

# Deploy na AWS
# Deploy para AWS

Para realizar o deploy do projeto para a AWS, basta rodar o comando:

```bash
serverless deploy
```

Isso vai configurar a API Gateway, Lambda e DynamoDB na AWS automaticamente. Após o deploy, o URL da API será fornecido no terminal.

Verifique o endpoint da API

Após o deploy, você verá um retorno semelhante a este:

```bash
Service Information
service: client-registration
stage: dev
region: us-east-1
stack: client-registration-dev
resources: 5
api keys:
  None
endpoints:
  GET /client/{id} - getClient
  POST /client - createClient
  PUT /client/{id} - updateClient
  DELETE /client/{id} - deleteClient
```

O endpoint da sua API estará disponível, e você pode usá-lo para interagir com o sistema CRUD de clientes.

Rotas da API
POST /client: Cria um novo cliente

Corpo da requisição:
```bash
{
  "name": "Nome Completo",
  "birthDate": "1990-01-01",
  "status": "ativo",
  "addresses": ["Endereço 1", "Endereço 2"],
  "contacts": [
    { "email": "email@dominio.com", "phone": "123456789", "primary": true }
  ]
}
Resposta: Status 201 e detalhes do cliente criado.
GET /client/{id}: Obtém informações de um cliente com base no ID

Parâmetro de rota: id do cliente
Resposta: Status 200 com os dados do cliente, ou 404 se não encontrado.
PUT /client/{id}: Atualiza as informações de um cliente existente

Parâmetro de rota: id do cliente
Corpo da requisição: Mesmo formato de POST
Resposta: Status 200 com os dados atualizados do cliente.
DELETE /client/{id}: Exclui um cliente com base no ID

Parâmetro de rota: id do cliente
Resposta: Status 200 com a mensagem de sucesso.
Testando o Projeto
Rodando os testes localmente
```

Os testes são configurados usando o Jest. Para rodar os testes, execute o seguinte comando:

```bash
npm test
```

Ou, se estiver usando o yarn:
```bash
yarn test
```
