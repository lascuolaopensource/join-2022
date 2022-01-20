import { GraphQLClient } from 'graphql-request';
import { getSdk } from '$lib/requestUtils/sdk';
import { headersAuth } from './authorizationHeader';
import { baseUrl } from './endpoints';

const graphqlEndpoint = 'graphql';

/**
 * Generic functions
 */

export function createGQLClient(headers: HeadersInit = {}): GraphQLClient {
	return new GraphQLClient(baseUrl + '/' + graphqlEndpoint, {
		headers
	});
}

export function createGQLSdk(headers: HeadersInit = {}) {
	return getSdk(createGQLClient(headers));
}

/**
 * Specific - utility - functions
 */

export function GQLCLient() {
	return createGQLSdk(headersAuth());
}
