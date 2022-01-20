import { GraphQLClient } from 'graphql-request';
import { getSdk } from '$lib/requestUtils/sdk';
import { createAuthorizationHeader } from './authorizationHeader';
import { baseUrl } from './endpoints';

export function createGQLClientAuth(token: string): GraphQLClient {
	return new GraphQLClient(baseUrl + '/graphql', {
		headers: {
			Authorization: createAuthorizationHeader(token)
		}
	});
}

export function createGQLClient(headers: HeadersInit = {}): GraphQLClient {
	return new GraphQLClient(baseUrl + '/graphql', { headers });
}

export function createGQLSdk(headers: HeadersInit = {}) {
	return getSdk(createGQLClient(headers));
}

// Note: GraphQL endpoint does not require /api before
