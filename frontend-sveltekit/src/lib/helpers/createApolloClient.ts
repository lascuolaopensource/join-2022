import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// https://hasura.io/learn/graphql/svelte-apollo/apollo-client/
// Row 14, "link: httpLink" - c'è un errore nel tutorial, che riporta solo "httpLink"

export default function createApolloClient(authToken) {
	const httpLink = new HttpLink({
		uri: 'http://localhost:1337/graphql',
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
