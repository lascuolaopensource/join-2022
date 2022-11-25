<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { PageData } from './$types';
	import { Container, BottomBar } from '$lib/components';
	import { Heading, Button } from 'flowbite-svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: PageData;

	const c = data.attributes;
	const coverUrl = `${PUBLIC_BACKEND_URL}${c?.gallery?.data[0].attributes?.url}`;
	const coverBg = `url(${coverUrl})`;
</script>

<div class="grow flex flex-col">
	<div id="cover" class="flex flex-col items-center justify-center" style:--cover-bg={coverBg}>
		<Heading tag="h3" color="text-white" align="center">{c?.name}</Heading>
	</div>

	<Container padding direction="column">
		<div class="mx-auto prose prose-sm prose-h1:font-semibold">
			<SvelteMarkdown source={c?.description} />
		</div>
	</Container>
</div>

<BottomBar background="blur">
	<Button href={`/enroll/${c?.slug}`}>Enroll!</Button>
</BottomBar>

<style>
	#cover {
		height: 50vh;
		max-height: 700px;
		background: var(--cover-bg) rgba(0, 0, 0, 0.4);
		background-blend-mode: multiply;
		background-size: cover;
		background-position: center;
	}
</style>
