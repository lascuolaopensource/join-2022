<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, types as t } from 'shared';

	import { CardCourseEnrolls, Loading } from '$lib/components';

	//

	const promise = (async () => {
		const res = await req.adminGetUpcomingCourses();
		const courses = res.courses as any as Array<t.ID<t.Course>>;

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

{#await promise}
	<Loading />
{:then categories}
	{#each categories as cat}
		<h1>{cat.label}</h1>
		<div class="space-between">
			{#if cat.courses.length}
				{#each cat.courses as c}
					<CardCourseEnrolls course={c} />
				{/each}
			{:else}
				<p style:color="gray">Non ci sono corsi in questa sezione</p>
			{/if}
		</div>
	{/each}
{/await}

<!--  -->
<style>
	h1 {
		margin-bottom: var(--s-3);
	}

	div {
		margin-bottom: var(--s-3);
	}
</style>
