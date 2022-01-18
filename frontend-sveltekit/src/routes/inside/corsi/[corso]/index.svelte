<!-- <script lang="ts">
	import { query, setClient } from 'svelte-apollo';
	import { GET_CORSO } from '$lib/requestUtils/queries';
	import createApolloClient from '$lib/requestUtils/createGQLClient';

	import { page } from '$app/stores';
	const ID: string = $page.params.corso;

	const client = createApolloClient(localStorage.getItem('token'));
	setClient(client);

	let corso = query(GET_CORSO, { variables: { id: ID } });
</script>

{#if $corso.loading}
	loading...
{:else}
	{$corso.data.corso.titolo}
	<a href="/inside/corsi/{ID}/iscrizione">Iscriviti!</a>
{/if} -->
