<script lang="ts">
	import { GQLCLient } from '$lib/requestUtils';

	import CardCorso from '$lib/components/cardCorso.svelte';
	import Loading from '$lib/components/loading.svelte';

	//

	const client = GQLCLient();

	async function loadCorsi() {
		const data = await client.getCourses();
		return data.courses.data;
	}

	const promise = loadCorsi();
</script>

<div class="container">
	<h1 class="title">Corsi</h1>
	{#await promise}
		<Loading />
	{:then data}
		<div class="space-between">
			{#each data as corso}
				<CardCorso
					title={corso.attributes.title}
					deadline={corso.attributes.enrollmentDeadline}
					href="/inside/corsi/{corso.attributes.slug}"
				/>
			{/each}
		</div>
	{:catch error}
		{error}
	{/await}
</div>

<style>
	.title {
		margin-bottom: 20px;
	}
</style>
