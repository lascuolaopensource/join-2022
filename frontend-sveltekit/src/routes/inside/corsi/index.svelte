<script lang="ts">
	import { createGQLClientAuth } from '$lib/requestUtils/createGQLClient';
	import { localStorageGet } from '$lib/utils/localStorageOps';
	import { GET_CORSI } from '$lib/requestUtils/queries';

	const client = createGQLClientAuth(localStorageGet('token'));

	async function loadCorsi() {
		try {
			const data = await client.request(GET_CORSI);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	const promise = loadCorsi();
	// setClient(client);

	// let corsi = query(GET_CORSI);
</script>

<h1>Corsi</h1>

{#await promise}
	loading
{:then corsi}
	<pre>{JSON.stringify(corsi, null, 2)}</pre>
{:catch error}
	{error}
{/await}

<!-- <style>
	.links {
		display: flex;
		flex-flow: column nowrap;
	}
</style> -->
