<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, types as t } from 'shared';

	import { Loading, Container } from '$lib/components';
	import { Title } from '$lib/ui';
	import CourseCard from '$lib/partials/admin/enrollments/courseCard.svelte';

	//

	const promise = (async () => {
		const res = await req.adminGetUpcomingCourses();
		const courses = res.courses as any as Array<t.ID<t.Course>>;

		console.log(courses);

		const active = courses.filter((c) => {
			const enrollments = c.enrollments as any as Array<t.Enrollment>;
			return h.course.isActive(c, enrollments);
		});
		const canStart = courses.filter((c) => {
			const enrollments = c.enrollments as any as Array<t.Enrollment>;
			return h.course.canStart(c, enrollments);
		});
		const cannotStart = courses.filter((c) => {
			const enrollments = c.enrollments as any as Array<t.Enrollment>;
			return h.course.cannotStart(c, enrollments);
		});
		const isEnrollmentTime = courses.filter((c) => {
			return h.course.isErollmentTime(c);
		});

		return [
			{ label: 'Corsi attivi', courses: active },
			{ label: 'Corsi in partenza', courses: canStart },
			{ label: 'Corsi non partiti', courses: cannotStart },
			{ label: 'Iscrizioni aperte', courses: isEnrollmentTime }
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
