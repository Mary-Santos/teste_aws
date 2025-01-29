import { APIGatewayProxyHandler } from 'aws-lambda';
import { docClient } from '../utils/dynamoClient';

export const deleteClient: APIGatewayProxyHandler = async (event) => {
  const clientId = event.pathParameters?.id;

  if (!clientId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Client ID is required' }),
    };
  }

  const params = {
    TableName: 'Clients',
    Key: { id: clientId },
  };

  try {
    await docClient.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Client deleted successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete client' }),
    };
  }
};