<script lang="ts">
	import { page } from '$app/stores';

	import { createGQLClientAuth } from '$lib/requestUtils/createGQLClient';
	import { getSdk } from '$lib/requestUtils/sdk';
	import { localStorageGet } from '$lib/utils/localStorageOps';

	import SvelteMarkdown from 'svelte-markdown';
	import Loading from '$lib/components/loading.svelte';

	//

	const client = createGQLClientAuth(localStorageGet('token'));
	const sdk = getSdk(client);
	const slug = $page.params.corso;

	async function getCorso() {
		const data = await sdk.getCourseBySlug({ slug });
		return data.courses.data[0];
	}

	const promise = getCorso();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then corso}
	<div class="cover">
		<h1>{corso.attributes.title}</h1>
	</div>
	<div class="markdown-body">
		<SvelteMarkdown source={corso.attributes.description} />
	</div>
{:catch error}
	{error}
{/await}

<!--  -->
<style>
	.cover {
		display: block;
		background-color: lightgray;
		min-height: 40vh;
		max-height: 500px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.cover h1 {
		text-align: center;
	}

	.markdown-body {
		padding: 20px;
	}
</style>
