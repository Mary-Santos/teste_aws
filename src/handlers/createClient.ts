import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client } from '../models/Client';
import { docClient } from '../utils/dynamoClient';

export const createClient: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const newClient: Client = {
    id: 'some-generated-id', 
    name: body.name,
    birthDate: body.birthDate,
    status: body.status,
    addresses: body.addresses,
    contacts: body.contacts,
  };

  const params = {
    TableName: 'Clients',
    Item: newClient,
  };

  try {
    await docClient.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(newClient),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create client' }),
    };
  }
};
