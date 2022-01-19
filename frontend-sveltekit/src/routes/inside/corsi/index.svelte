<script>
	import { createGQLClientAuth } from '$lib/requestUtils/createGQLClient';
	import { localStorageGet } from '$lib/utils/localStorageOps';
	import { GET_CORSI } from '$lib/requestUtils/queries';

	import CardCorso from '$lib/components/cardCorso.svelte';

	//

	const client = createGQLClientAuth(localStorageGet('token'));

	async function loadCorsi() {
		try {
			const data = await client.request(GET_CORSI);
			return data.courses.data;
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
{:then data}
	{#each data as corso}
		<CardCorso
			title={corso.attributes.title}
			deadline={corso.attributes.enrollmentDeadline}
			href="/inside/corsi/{corso.attributes.slug}"
		/>
	{/each}
{:catch error}
	{error}
{/await}

<!-- <style>
	.links {
		display: flex;
		flex-flow: column nowrap;
	}
</style> -->
