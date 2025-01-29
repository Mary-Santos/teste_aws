import { APIGatewayProxyHandler } from 'aws-lambda';
import { docClient } from '../utils/dynamoClient';

export const getClient: APIGatewayProxyHandler = async (event) => {
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
    const result = await docClient.get(params).promise();
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Client not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve client' }),
    };
  }
};