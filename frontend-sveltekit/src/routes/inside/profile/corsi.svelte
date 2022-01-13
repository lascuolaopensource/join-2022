<script lang="ts">
	import createApolloClient from '$lib/requestUtils/createApolloClient';
	import { setClient, query } from 'svelte-apollo';
	import { GET_ISCRIZIONI } from '$lib/requestUtils/queries';

	// Setting the GraphQL client
	const client = createApolloClient(localStorage.getItem('token'));
	setClient(client);

	const iscrizioni = query(GET_ISCRIZIONI);
</script>

le tue iscrizioni ai corsi:

{#if $iscrizioni.loading}
	loading...
{:else if $iscrizioni.error}
	Error!
{:else if $iscrizioni.data}
	<ul>
		{#each $iscrizioni.data.me.iscrizioni as iscrizione}
			<li>{iscrizione.corso.titolo} {iscrizione.lettera_motivazionale}</li>
		{/each}
	</ul>
{/if}
