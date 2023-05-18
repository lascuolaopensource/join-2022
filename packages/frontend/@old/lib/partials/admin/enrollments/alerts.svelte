<script lang="ts">
	import { helpers as h } from 'shared';
	import type { types as t } from 'shared';

	import { Callout } from '$lib/components';

	export let course: t.CourseEntity;
	export let enrollments: Array<t.EnrollmentEntity>;

	// Shorthands
	const c = course.attributes;
	const enrolls = enrollments.map((e) => e.attributes);

	// Alert 1
	let minNotReached: boolean;
	let ratioMin: string;

	// Alert 2
	let maxReached: boolean;
	let ratioMax: string;

	// Alert 3
	let areMinEnrollsApproved: boolean;
	let ratioApproved: string;

	// Calculating alerts
	$: if (course && c && enrollments) {
		// Alert 1
		minNotReached = enrollments.length < c.enrollmentMin;
		ratioMin = `${enrollments.length} / ${c.enrollmentMin}`;

		// Alert 2
		maxReached = c.enrollmentMax ? c.enrollmentMax < enrollments.length : false;
		ratioMax = `${enrollments.length} / ${c.enrollmentMax}`;

		// Alert 3
		const enrollsApproved = h.course.countEnrollsApproved(
			enrolls as Array<t.Enrollment>
		);
		areMinEnrollsApproved = h.course.areMinEnrollsApproved(
			c,
			enrolls as Array<t.Enrollment>
		);
		ratioApproved = `${enrollsApproved} / ${c.enrollmentMin}`;
	}
</script>

<!--  -->

<div class="space-y-2">
	<!-- Iscrizioni approvate minori del minimo -->
	{#if !minNotReached && areMinEnrollsApproved}
		<Callout color="green">
			<p>
				Il numero minimo di iscrizioni è stato approvato.<br />
				Il corso può partire
			</p>
		</Callout>
	{/if}

	<!-- Iscrizioni minime non raggiunte -->
	{#if minNotReached}
		<Callout>
			<p>
				⚠️ Il numero minimo delle iscrizioni non è stato raggiunto:
				<strong>{ratioMin}</strong>
			</p>
		</Callout>
	{/if}

	<!-- Iscrizioni massime superate -->
	{#if maxReached}
		<Callout>
			<p>
				⚠️ Il numero massimo delle iscrizioni è stato superato:
				<strong>{ratioMax}</strong><br />
				Potrebbe essere necessaria una selezione<br />
			</p>
		</Callout>
	{/if}

	<!-- Iscrizioni approvate minori del minimo -->
	{#if !minNotReached && !areMinEnrollsApproved}
		<Callout>
			<p>
				⚠️ Il numero minimo di iscrizioni NON è stato approvato
				<strong>{ratioApproved}</strong><br />
				Bisogna approvare altre candidature<br />
			</p>
		</Callout>
	{/if}
</div>
