<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { Loading } from '$lib/components';
	import { types as t } from 'shared';

	const promise = req.getUserEnrollments();
</script>

{#await promise}
	<Loading />
{:then res}
	{@const enrollments = res.enrollments}
	{@const enrollmentsPending = enrollments.filter((e) => {
		return e.state == t.Enum_Enrollment_State.Pending;
	})}
	{#each enrollmentsPending as en}
		{@const course = en.course}
		{en.state}
		{course.title}
	{/each}
{/await}
