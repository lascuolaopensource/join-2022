<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, types as t } from 'shared';

	import { Loading, Container, Title } from '$lib/components';
	import CourseCard from '$lib/partials/admin/enrollments/courseCard.svelte';

	//

	const promise = (async () => {
		const res = await req.adminGetUpcomingCourses();
		const courses = res.courses as any as Array<t.ID<t.Course>>;

		const isEnrollmentTime = courses.filter((c) => {
			return h.course.isErollmentTime(c);
		});
		const isEvaluationTime = courses.filter((c) => {
			return h.course.isEvaluationTime(c) && !c.confirmed;
		});
		const isConfirmed = courses.filter((c) => {
			return c.confirmed;
		});

		return [
			{ label: 'Iscrizioni aperte', courses: isEnrollmentTime },
			{ label: 'Iscrizioni chiuse', courses: isEvaluationTime },
			{ label: 'Confermati', courses: isConfirmed }
		];
	})();
</script>

<!--  -->

<Container>
	{#await promise}
		<Loading />
	{:then categories}
		{#each categories as cat}
			<div class="mb-6">
				<Title>{cat.label}</Title>
				<div class="space-y-2 mt-2">
					{#if cat.courses.length}
						{#each cat.courses as c}
							<CourseCard course={c} />
						{/each}
					{:else}
						<p class="text-gray-400">Non ci sono corsi in questa sezione</p>
					{/if}
				</div>
			</div>
		{/each}
	{/await}
</Container>
