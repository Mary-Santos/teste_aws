import { APIGatewayEvent, Context } from 'aws-lambda';
import { createClient } from '../handlers/createClient';
import {  getClient } from '../handlers/getClient';
import { updateClient } from '../handlers/updateClient';
import { deleteClient } from '../handlers/deleteClient';
import { DynamoDB } from 'aws-sdk';

// Mock do DynamoDB
jest.mock('aws-sdk', () => {
  const mockDynamoDB = {
    put: jest.fn().mockReturnThis(),
    get: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({}),
  };
  return { DynamoDB: jest.fn(() => mockDynamoDB) };
});

describe('Client CRUD Operations', () => {
  // Teste para Criação de Cliente (POST /client)
  it('should create a new client successfully', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        name: "John Doe",
        birthDate: "1990-01-01",
        status: "ativo",
        addresses: ["123 Main St"],
        contacts: [{ email: "john.doe@example.com", phone: "123456789", primary: true }],
      }),
    } as any;

    const context: Context = {} as any;

    const response = await createClient(event, context);

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).name).toBe("John Doe");
  });

  // Teste para Leitura de Cliente (GET /client/{id})
  it('should return a client successfully', async () => {
    const event: APIGatewayEvent = {
      pathParameters: { id: "123" },
    } as any;

    const context: Context = {} as any;

    const response = await getClient(event, context);

    expect(response.statusCode).toBe(200);
    const client = JSON.parse(response.body);
    expect(client.name).toBe("John Doe");
  });

  it('should return 404 if client is not found', async () => {
    jest.spyOn(DynamoDB.prototype, 'get').mockResolvedValueOnce({});

    const event: APIGatewayEvent = {
      pathParameters: { id: "999" },
    } as any;

    const context: Context = {} as any;

    const response = await getClient(event, context);

    expect(response.statusCode).toBe(404);
  });

  // Teste para Atualização de Cliente (PUT /client/{id})
  it('should update the client successfully', async () => {
    const event: APIGatewayEvent = {
      pathParameters: { id: "123" },
      body: JSON.stringify({
        name: "John Updated",
        birthDate: "1990-01-01",
        status: "ativo",
        addresses: ["456 New St"],
        contacts: [{ email: "john.updated@example.com", phone: "987654321", primary: true }],
      }),
    } as any;

    const context: Context = {} as any;

    const response = await updateClient(event, context);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).name).toBe("John Updated");
  });

  it('should return 404 if client to update is not found', async () => {
    jest.spyOn(DynamoDB.prototype, 'update').mockResolvedValueOnce({});

    const event: APIGatewayEvent = {
      pathParameters: { id: "999" },
    } as any;

    const context: Context = {} as any;

    const response = await updateClient(event, context);

    expect(response.statusCode).toBe(404);
  });

  // Teste para Exclusão de Cliente (DELETE /client/{id})
  it('should delete the client successfully', async () => {
    const event: APIGatewayEvent = {
      pathParameters: { id: "123" },
    } as any;

    const context: Context = {} as any;

    const response = await deleteClient(event, context);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Client deleted successfully");
  });

  it('should return 404 if client to delete is not found', async () => {
    jest.spyOn(DynamoDB.prototype, 'delete').mockResolvedValueOnce({});

    const event: APIGatewayEvent = {
      pathParameters: { id: "999" },
    } as any;

    const context: Context = {} as any;

    const response = await deleteClient(event, context);

    expect(response.statusCode).toBe(404);
  });
});
