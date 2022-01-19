import { GraphQLClient } from 'graphql-request';
import { createAuthorizationHeader } from './authorizationHeader';
import { baseUrl } from './endpoints';

export function createGQLClientAuth(token: string): GraphQLClient {
	return new GraphQLClient(baseUrl + '/graphql', {
		headers: {
			Authorization: createAuthorizationHeader(token)
		}
	});
}

// Note: GraphQL endpoint does not require /api before
