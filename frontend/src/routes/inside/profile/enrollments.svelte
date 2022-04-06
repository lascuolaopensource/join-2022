<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { Loading, Callout } from '$lib/components';
	import { types as t, formatters as f, helpers as h } from 'shared';
	import { enrollmentStates } from '$lib/strings';

	const promise = (async () => {
		const enrollmentsReq = await req.getUserEnrollments();
		const enrollments = enrollmentsReq.enrollments;
		const today = new Date().valueOf();

		// Current enrollments
		const enrollments_current = enrollments.filter((e) => {
			const startDate = Date.parse(h.course.getStartDate(e.course));
			return today < startDate && e.state != t.Enum_Enrollment_State.Rejected;
		});
		enrollments_current.sort((a, b) => {
			return (
				Date.parse(a.course.enrollmentDeadline) -
				Date.parse(b.course.enrollmentDeadline)
			);
		});

		// Past enrollments
		const enrollments_past = enrollments.filter((e) => {
			const endDate = Date.parse(h.course.getEndDate(e.course));
			return today > endDate || e.state == t.Enum_Enrollment_State.Rejected;
		});
		enrollments_past.sort((a, b) => {
			return (
				Date.parse(a.course.enrollmentDeadline) -
				Date.parse(b.course.enrollmentDeadline)
			);
		});

		return { enrollments_current, enrollments_past };
	})();

	const statesColors: Record<t.Enum_Enrollment_State, string> = {
		pending: 'orange',
		awaitingPayment: 'orange',
		approved: 'green',
		rejected: 'red'
	};
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<!-- Iscrizioni attive -->

	{#if res.enrollments_current.length}
		<h1>Iscrizioni attive</h1>

		<Callout>
			<strong>Nota:</strong> Per annullare un'iscrizione
			<a href="mailto:didattica@lascuolaopensource.xyz"
				>contatta il team didattica</a
			>
		</Callout>

		<div class="enrollment__container">
			{#each res.enrollments_current as en}
				{@const course = en.course}
				<div class="enrollment">
					<p><strong>{course.title}</strong></p>
					<p>Iscritto il: {f.formatDateString(en.createdAt)}</p>
					<p>
						Stato: <span style:color={statesColors[en.state]}
							>{enrollmentStates[en.state]}</span
						>
					</p>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Iscrizioni passate -->
	{#if res.enrollments_past.length}
		<h1>Iscrizioni passate</h1>

		<div class="enrollment__container">
			{#each res.enrollments_past as en}
				{@const course = en.course}
				<div class="enrollment">
					<p><strong>{course.title}</strong></p>
					<p>Iscritto il: {f.formatDateString(en.createdAt)}</p>
					<p>
						Stato: <span style:color={statesColors[en.state]}
							>{enrollmentStates[en.state]}</span
						>
					</p>
				</div>
			{/each}
		</div>
	{/if}
{/await}

<!--  -->
<style>
	h1 {
		margin-bottom: var(--s-3);
	}

	.enrollment__container {
		margin-bottom: var(--s-3);
		margin-top: var(--s-3);
	}

	.enrollment {
		background-color: white;
		border: 1px solid gray;
		padding: var(--s-2);
	}
</style>
