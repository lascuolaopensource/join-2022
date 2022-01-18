import { GraphQLClient } from 'graphql-request';
import { createAuthorizationHeader } from './authorizationHeader';

export function createGQLClientAuth(token: string): GraphQLClient {
	return new GraphQLClient('http://localhost:1337/graphql', {
		headers: {
			Authorization: createAuthorizationHeader(token)
		}
	});
}

// Note: GraphQL endpoint does not require /api before
