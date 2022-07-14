<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }: any) {
		const courses = await req.getCoursesByDeadline('expired', fetch);

		return {
			props: {
				courses
			}
		};
	}
</script>

<script lang="ts">
	import type { types as t } from 'shared';

	import { Container, Title } from '$lib/components';
	import CardCourse from '$lib/partials/courses/cardCourse.svelte';

	export let courses: t.CourseEntityResponseCollection;
</script>

<!--  -->

<Container>
	<Title margin>Archivio corsi</Title>
	{#if courses.data.length}
		<div class="space-y-2">
			{#each courses.data as course}
				{#if course.attributes}
					<CardCourse
						title={course.attributes.title}
						deadline={course.attributes.enrollmentDeadline}
						href="/inside/course/{course.attributes.slug}"
					/>
				{/if}
			{/each}
		</div>
	{:else}
		<p class="block text-center">Non ci sono corsi nell'archivio!</p>
	{/if}
</Container>
