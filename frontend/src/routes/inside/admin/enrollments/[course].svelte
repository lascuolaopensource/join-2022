<script lang="ts">
	import { req } from '$lib/requestUtils';
	import type { types as t } from 'shared';
	import { page } from '$app/stores';

	import { Loading, CardEnrollment } from '$lib/components';

	//

	const courseID = $page.params.course;

	let course: t.CourseEntityResponse;
	let enrollments: t.EnrollmentEntityResponseCollection;

	const promise = (async () => {
		course = await req.getCourseByID(courseID);
		enrollments = await req.adminGetCourseEnrollments(courseID);
	})();
</script>

{#await promise}
	<Loading />
{:then res}
	<h2>{course.data.attributes.title}</h2>
	<h1>Iscrizioni</h1>

	{#if enrollments.data.length}
		{#each enrollments.data as e}
			<CardEnrollment enrollment={e} />
		{/each}
	{/if}
{/await}
