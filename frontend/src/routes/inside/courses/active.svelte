<script lang="ts" context="module">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }: any) {
		const courses = await req.getCoursesByDeadline('future', fetch);

		return {
			props: {
				courses
			}
		};
	}
</script>

<script lang="ts">
	import type { types as t } from 'shared';

	import { Container, CardCourse } from '$lib/components';
	import { Title, Link } from '$lib/ui';

	export let courses: t.CourseEntityResponseCollection;
</script>

<!--  -->

<Container>
	<Title margin>Corsi attivi</Title>
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
		<p>Non ci sono corsi attivi al momento!</p>
		<Link href="/inside/courses/archive">Dai un'occhiata ai corsi passati</Link>
	{/if}
</Container>
