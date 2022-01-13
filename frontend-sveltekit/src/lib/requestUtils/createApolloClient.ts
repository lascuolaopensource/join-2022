import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

import { createAuthorizationHeader } from './authorizationHeader';
import { endpoints } from './endpoints';

// https://hasura.io/learn/graphql/svelte-apollo/apollo-client/
// Row 14, "link: httpLink" - c'è un errore nel tutorial, che riporta solo "httpLink"

export default function createApolloClient(authToken) {
	const httpLink = new HttpLink({
		uri: endpoints.graphql + '/graphql',
		headers: {
			Authorization: createAuthorizationHeader(authToken)
		}
	});
	const cache = new InMemoryCache();
	const client = new ApolloClient({
		link: httpLink,
		cache: cache
	});
	return client;
}
