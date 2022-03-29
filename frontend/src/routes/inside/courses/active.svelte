<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const courses = await req.getCoursesByDeadline('future');

		return {
			props: {
				courses
			}
		};
	}
</script>

<script lang="ts">
	import type { t } from 'shared';
	import CardCorso from '$lib/components/cardCorso.svelte';

	export let courses: t.CourseEntityResponseCollection;
</script>

<!--  -->

<div class="container">
	<h1 class="title">Corsi attivi</h1>
	{#if courses.data.length}
		<div class="space-between">
			{#each courses.data as corso}
				<CardCorso
					title={corso.attributes.title}
					deadline={corso.attributes.enrollmentDeadline}
					href="/inside/course/{corso.attributes.slug}"
				/>
			{/each}
		</div>
	{:else}
		Non ci sono corsi attivi al momento!
		<a href="/inside/courses/archive">Dai un'occhiata ai corsi passati</a>
	{/if}
</div>

<!--  -->
<style>
	.title {
		margin-bottom: 20px;
	}
</style>
