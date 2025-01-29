import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client } from '../models/Client';
import { docClient } from '../utils/dynamoClient';

export const updateClient: APIGatewayProxyHandler = async (event) => {
  const clientId = event.pathParameters?.id;

  if (!clientId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Client ID is required' }),
    };
  }

  const body = JSON.parse(event.body || '{}');
  const updatedClient: Client = {
    id: clientId,
    name: body.name,
    birthDate: body.birthDate,
    status: body.status,
    addresses: body.addresses,
    contacts: body.contacts,
  };

  const params = {
    TableName: 'Clients',
    Key: { id: clientId },
    UpdateExpression: 'set #name = :name, #birthDate = :birthDate, #status = :status, #addresses = :addresses, #contacts = :contacts',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#birthDate': 'birthDate',
      '#status': 'status',
      '#addresses': 'addresses',
      '#contacts': 'contacts',
    },
    ExpressionAttributeValues: {
      ':name': updatedClient.name,
      ':birthDate': updatedClient.birthDate,
      ':status': updatedClient.status,
      ':addresses': updatedClient.addresses,
      ':contacts': updatedClient.contacts,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await docClient.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update client' }),
    };
  }
};