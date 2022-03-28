<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const slug = params.course;
		const course = await req.getCourseBySlug(slug, fetch);

		return {
			props: {
				slug,
				course
			}
		};
	}
</script>

<script lang="ts">
	import { h } from 'shared';
	import type { t } from 'shared';
	import SvelteMarkdown from 'svelte-markdown';

	export let course: t.CourseEntity;
	export let slug: string;

	// Checking if user is enrolled
	const promise = req.isUserEnrolled(course.id);

	const c = course.attributes;
</script>

<!--  -->

<!-- Core corso -->
<div class="cover">
	<h1>{c.title}</h1>
</div>
{#if c.description}
	<div class="markdown-body">
		<SvelteMarkdown source={c.description} />
	</div>
{/if}

<!-- Iscriviti -->
{#if h.course.isEnrollable(c)}
	<div class="iscriviti-container">
		{#await promise then isUserEnrolled}
			{#if isUserEnrolled.enrolled}
				<div class="btn btn-shadow" disabled>Sei già iscritto!</div>
			{:else}
				<a
					class="btn btn-primary btn-big btn-shadow"
					href="/shared/enroll/{slug}">Iscriviti →</a
				>
			{/if}
		{/await}
	</div>
{/if}

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
</style>
