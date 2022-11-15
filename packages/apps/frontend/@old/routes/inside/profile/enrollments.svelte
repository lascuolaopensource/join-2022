<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { Loading, Callout, Title } from '$lib/components';
	import { types as t, helpers as h } from 'shared';

	import CardEnrollment from '$lib/partials/profile/cardEnrollment.svelte';

	//

	let promise = getData();
	let enrollments_current: Array<t.Enrollment> = [];
	let enrollments_past: Array<t.Enrollment> = [];

	async function getData() {
		// Getting data
		const enrollments = await req.getUserEnrollments();

		// Getting today expressed as integer
		const today = new Date().valueOf();

		// Current enrollments
		enrollments_current = enrollments.filter((e) => {
			const course = e.course as any as t.Course;
			const startDate = Date.parse(h.course.getStartDate(course));
			return today < startDate;
		});
		sortEnrollmentsArray(enrollments_current);

		// Past enrollments
		enrollments_past = enrollments.filter((e) => {
			const course = e.course as any as t.Course;
			const startDate = Date.parse(h.course.getStartDate(course));
			return today > startDate;
		});
		sortEnrollmentsArray(enrollments_past);
	}

	function sortEnrollmentsArray(a: Array<t.Enrollment>) {
		a.sort((a, b) => {
			const courseA = a.course as any as t.Course;
			const deadA = Date.parse(courseA.enrollmentDeadline);
			const courseB = b.course as any as t.Course;
			const deadB = Date.parse(courseB.enrollmentDeadline);
			return deadA - deadB;
		});
	}
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<!-- Iscrizioni attive -->
	<div class="space-y-4">
		<Title>Iscrizioni attive</Title>

		{#if enrollments_current.length}
			<Callout>
				<strong>Nota:</strong> Per annullare un'iscrizione
				<a href="mailto:didattica@lascuolaopensource.xyz"
					>contatta il team didattica</a
				>
			</Callout>

			{#each enrollments_current as enrollment}
				<CardEnrollment {enrollment} />
			{/each}
		{:else}
			<p class="text-gray-400">Non ci sono iscrizioni in questa sezione</p>
		{/if}
	</div>

	<!-- Iscrizioni passate -->
	<div class="space-y-4 mt-8">
		<Title>Iscrizioni passate</Title>

		{#if enrollments_past.length}
			{#each enrollments_past as enrollment}
				<CardEnrollment {enrollment} />
			{/each}
		{:else}
			<p class="text-gray-400">Non ci sono iscrizioni in questa sezione</p>
		{/if}
	</div>
{/await}
