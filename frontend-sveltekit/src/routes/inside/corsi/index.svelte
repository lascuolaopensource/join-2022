<script lang="ts">
	import { query } from 'svelte-apollo';
	import { GET_CORSI } from '$lib/queries';

	import createApolloClient from '$lib/helpers/createApolloClient';
	import { setClient } from 'svelte-apollo';

	const client = createApolloClient(localStorage.getItem('token'));
	setClient(client);

	let corsi = query(GET_CORSI);
</script>

<h1>Corsi</h1>

{#if $corsi.loading}
	loading...
{:else if $corsi.error}
	Error!
{:else if $corsi.data}
	<div class="links">
		{#each $corsi.data.corsos as corso}
			<a href="/inside/corsi/{corso.id}">{corso.titolo}</a>
		{/each}
	</div>
{/if}

<style>
	.links {
		display: flex;
		flex-flow: column nowrap;
	}
</style>
