<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, types as t } from 'shared';

	import { CardCourseEnrolls } from '$lib/components';

	const promise = req.adminGetActiveCourses();
</script>

{#await promise}
	load
{:then res}
	<h1>Da approvare</h1>
	<div class="space-between">
		{#each res.courses as c}
			{#if !h.course.isErollmentTime(c) && c.enrollments.length >= c.enrollmentMin}
				<CardCourseEnrolls course={c} />
			{/if}
		{/each}
	</div>

	<h1>Non partiti</h1>
	<div class="space-between">
		{#each res.courses as c}
			{#if !h.course.isErollmentTime(c) && c.enrollments.length < c.enrollmentMin}
				<CardCourseEnrolls course={c} />
			{/if}
		{/each}
	</div>

	<h1>In iscrizione</h1>
	<div class="space-between">
		{#each res.courses as c}
			{#if h.course.isErollmentTime(c)}
				<CardCourseEnrolls course={c} />
			{/if}
		{/each}
	</div>
{/await}

<style>
	h1 {
		margin-bottom: var(--s-3);
	}

	div {
		margin-bottom: var(--s-3);
	}
</style>
