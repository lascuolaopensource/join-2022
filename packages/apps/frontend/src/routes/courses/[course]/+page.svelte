<script lang="ts">
	import { env } from '$env/dynamic/public';
	import type { PageData } from './$types';
	import { Container, BottomBar } from '$lib/components';
	import { Heading, Button } from 'flowbite-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { helpers as h, formatters as f } from 'join-shared';
	import paths from '$lib/constants/paths';

	export let data: PageData;

	const c = data.course!.attributes!;

	const coverUrl = `${env.PUBLIC_BACKEND_URL}${c?.gallery?.data[0].attributes?.url}`;
	const coverBg = `url(${coverUrl})`;

	const hasDeadlinePassed = h.Course.hasDeadlinePassed(c);
</script>

<!--  -->

<div class="grow flex flex-col">
	<div id="cover" class="flex flex-col items-center justify-center" style:--cover-bg={coverBg}>
		<Heading tag="h3" color="text-white" align="center">{c.name}</Heading>
	</div>

	<Container padding direction="column">
		<div class="mx-auto prose prose-sm prose-h1:font-semibold">
			<SvelteMarkdown source={c.description} />
		</div>
	</Container>
</div>

<BottomBar background="blur">
	{#if !hasDeadlinePassed}
		<Button href={paths.courses.enroll.index(c.slug)}>Enroll!</Button>
	{:else}
		<Button disabled color="alternative">
			Enrollments closed on {f.formatDate(c.enrollmentDeadline)}
		</Button>
	{/if}
</BottomBar>

<!--  -->
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
