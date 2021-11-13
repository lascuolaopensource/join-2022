import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { variables } from '$lib/variables';

// https://hasura.io/learn/graphql/svelte-apollo/apollo-client/
// Row 14, "link: httpLink" - c'è un errore nel tutorial, che riporta solo "httpLink"

export default function createApolloClient(authToken) {
	const httpLink = new HttpLink({
		uri: variables.backendUrl + '/graphql',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
	const cache = new InMemoryCache();
	const client = new ApolloClient({
		link: httpLink,
		cache: cache
	});
	return client;
}
