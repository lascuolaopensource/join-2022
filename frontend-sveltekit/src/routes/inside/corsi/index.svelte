<script lang="ts">
	import { createGQLClientAuth } from '$lib/requestUtils/createGQLClient';
	import { getSdk } from '$lib/requestUtils/sdk';
	import { lsGet } from '$lib/localStorageUtils/ops';

	import CardCorso from '$lib/components/cardCorso.svelte';
	import Loading from '$lib/components/loading.svelte';

	//

	const client = createGQLClientAuth(lsGet('token'));
	const sdk = getSdk(client);

	async function loadCorsi() {
		const data = await sdk.getCorsi();
		return data.courses.data;
	}

	const promise = loadCorsi();
</script>

<div class="container">
	<h1 class="title">Corsi</h1>
	{#await promise}
		<Loading />
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
</div>

<style>
	.container {
		padding: 20px;
	}

	.title {
		margin-bottom: 20px;
	}
</style>
