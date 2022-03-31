<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { Loading } from '$lib/components';
	import { types as t, formatters as f } from 'shared';

	const promise = req.getUserEnrollments();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	{@const enrollments = res.enrollments}

	<h1>Iscrizioni attive</h1>
	{@const enrollmentsPending = enrollments.filter((e) => {
		return e.state == t.Enum_Enrollment_State.Pending;
	})}
	{#each enrollmentsPending as en}
		{@const course = en.course}
		<div class="enrollment">
			<p><strong>{course.title}</strong></p>
			<p>Iscritto il: {f.formatDateString(en.createdAt)}</p>
			<p>Stato: {en.state}</p>
		</div>
	{/each}
{/await}

<!--  -->
<style>
	h1 {
		margin-bottom: var(--s-3);
	}

	.enrollment {
		background-color: white;
		border: 1px solid gray;
		padding: var(--s-2);
	}
</style>
