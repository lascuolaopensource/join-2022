<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, type types as t, type formatters as f } from 'shared';
	import { page } from '$app/stores';
	import _ from 'lodash';
	import { writable } from 'svelte/store';

	import type { TooltipContent } from '$lib/components/tooltip.svelte';

	import {
		BottomBar,
		Button,
		Callout,
		Container,
		Hr,
		Link,
		Loading,
		Modal,
		ModalConfirm,
		Title,
		Tooltip
	} from '$lib/components';

	import EnrollmentsTable from '$lib/partials/admin/enrollments/enrollmentsTable.svelte';
	import Alerts from '$lib/partials/admin/enrollments/alerts.svelte';

	/**
	 * Setup base variables
	 */

	// Getting course ID
	const courseID = $page.params.course;

	// Course will be stored here
	let course: t.CourseEntity;

	/**
	 * Enrollments
	 */

	// Enrollments will be stored here
	let enrollments: Array<t.EnrollmentEntity>;

	// Stores a copy of the "original" enrollments, before edits
	// Useful to detect changes
	let enrollmentsInit: Array<t.EnrollmentEntity>;

	// Regenerates "enrollmentsInit" from current "enrollments"
	function resetInit() {
		enrollmentsInit = _.cloneDeep(enrollments);
	}

	/**
	 * Course additional info variables
	 */

	let isEvaluationTime: boolean;
	let enrollmentDeadline: Date;
	let confirmed: boolean;

	function calcCourseData() {
		const c = course.attributes;
		//
		if (course && c && enrollments) {
			isEvaluationTime = h.course.isEvaluationTime(c);
			enrollmentDeadline = new Date(c.enrollmentDeadline);
			confirmed = c.confirmed;
		}
	}

	/**
	 * Fetching data
	 */

	let promise = getCourseAndEnrollments();

	// Gets and sets up all the enrollments for this course
	async function getCourseAndEnrollments() {
		// Getting course with enrollments
		const courseRes = await req.adminGetCourseEnrollments(courseID);

		// Extracting course
		if (courseRes.data) {
			// Saving course
			course = courseRes.data;

			// Extracting enrollments
			const enrollmentsRes = course.attributes?.enrollments;

			// If the enrollments exist
			if (enrollmentsRes) {
				// Saving enrollments
				enrollments = enrollmentsRes.data;
				// Updating backup
				resetInit();

				// Calculating all course data
				calcCourseData();
			}
		}
	}

	/**
	 * Changes management
	 */

	let changed = false;
	$: changed = !_.isEqual(enrollments, enrollmentsInit);

	async function undo() {
		enrollments = _.cloneDeep(enrollmentsInit);
	}

	async function save() {
		try {
			await req.adminUpdateEnrollments(enrollments);
			// Resetting
			promise = getCourseAndEnrollments();
			//
			// tooltipContent = {
			// 	state: 'positive',
			// 	message: 'Iscrizioni aggiornate con successo!'
			// };
		} catch (e) {
			// tooltipContent = {
			// 	state: 'negative',
			// 	message: JSON.stringify(e)
			// };
		}
	}

	/**
	 * Course lock and email send
	 */

	// Store to display modal
	const showModal = writable(false);
	const open = () => {
		$showModal = true;
	};
	const close = () => {
		$showModal = false;
	};

	async function lockAndNotify() {
		close();
		try {
			await req.adminEnrollmentsCloseCourse(courseID);
			// Resetting
			promise = getCourseAndEnrollments();
			// tooltipContent = {
			// 	state: 'positive',
			// 	message: 'Gli utenti sono stati notificati!'
			// };
		} catch (e) {
			// tooltipContent = {
			// 	state: 'negative',
			// 	message: JSON.stringify(e)
			// };
		}
	}

	// //

	// let tooltipContent: TooltipContent = null;
</script>

<!--  -->

<Container>
	{#await promise}
		<Loading />
	{:then res}
		{#if course && course.attributes && enrollments}
			<!-- Intro -->
			<Link backlink margin href="/inside/admin/enrollments">
				Torna alla lista dei corsi
			</Link>
			<Title margin>{course.attributes.title}</Title>

			<!-- Content -->
			<div class="space-y-6">
				{#if !course.attributes.confirmed}
					<Alerts {course} bind:enrollments />
				{/if}

				<Hr mode="light" />

				{#if !confirmed}
					<!-- Confirmation section -->
					<div>
						<!-- Confirmation button -->
						<Button disabled={!isEvaluationTime} on:click={open}>
							Chiudi il corso e invia conferma
						</Button>

						<!-- Helper deadline text -->
						{#if !isEvaluationTime}
							<p class="text-gray-700 mt-2">
								Sarà possibile chiudere il corso dopo il
								<strong>
									{enrollmentDeadline}
								</strong>
							</p>
						{/if}
					</div>
				{:else}
					<!-- Already confirmed -->
					<div>
						<p>Il corso è stato chiuso e confermato</p>
					</div>
				{/if}

				<Hr mode="light" />

				<!-- Enrollments management table -->
				<EnrollmentsTable isCourseConfirmed={confirmed} bind:enrollments />
			</div>

			<!--  -->

			<!-- <Tooltip content={tooltipContent} /> -->

			<!-- Confirmation modal -->
			<Modal visible={showModal} title="Attenzione!">
				<div class="space-y-4">
					<!-- Info text -->
					<p>
						Sei sicur* di chiudere il corso? <br />
						Verranno inviate mail di conferma a tutte le persone che hanno inviato
						la candidatura.
					</p>
					<Alerts {course} {enrollments} />
					<p>
						Per procedere, digita qui il titolo del corso
						<strong>{course.attributes?.title}</strong>
					</p>

					<!-- Confirmation modal -->
					<ModalConfirm
						match={course.attributes.title}
						on:confirmed={lockAndNotify}
					/>
				</div>
			</Modal>
		{/if}
	{:catch err}
		{err}
	{/await}
</Container>

<!-- Changes bar -->
{#if changed}
	<BottomBar>
		<div class="flex flex-row flex-nowrap items-center justify-between">
			<p>Ci sono cambiamenti</p>
			<div class="space-x-1">
				<Button hierarchy="secondary" on:click={undo}>Annulla</Button>
				<Button on:click={save}>Salva!</Button>
			</div>
		</div>
	</BottomBar>
{/if}
