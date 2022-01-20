<script lang="ts">
	import { page } from '$app/stores';
	import { GQLCLient } from '$lib/requestUtils';

	//

	import SvelteMarkdown from 'svelte-markdown';
	import Loading from '$lib/components/loading.svelte';

	//

	const client = GQLCLient();
	const slug = $page.params.corso;

	async function getCorso() {
		const data = await client.getCourseBySlug({ slug });
		return data.courses.data[0].attributes;
	}

	const promise = getCorso();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then corso}
	<div class="cover">
		<h1>{corso.title}</h1>
	</div>
	<div class="markdown-body">
		<SvelteMarkdown source={corso.description} />
	</div>
	<!-- Iscriviti -->
	<div class="iscriviti-container">
		<a class="iscriviti" href="{$page.url.pathname}/iscrizione">Iscriviti →</a>
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

	.iscriviti-container {
		position: sticky;
		bottom: 0;
		width: 100%;
		padding: 20px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-end;
	}

	.iscriviti {
		padding: 20px;
		background-color: var(--btn-bg-primary);
		text-decoration: none;
		color: var(--content-primary-l);
		box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
	}
</style>
