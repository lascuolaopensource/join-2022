<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, types as t, formatters as f } from 'shared';
	import { page } from '$app/stores';
	import _ from 'lodash';
	import qs from 'qs';

	import {
		Loading,
		CardEnrollment,
		Modal,
		ModalConfirm,
		Tooltip
	} from '$lib/components';
	import type { TooltipContent } from '$lib/components/tooltip.svelte';
	import { s, enrollmentStatesAdmin } from '$lib/strings';
	import { navHgt } from '$lib/components/navbarMain.svelte';

	//

	const courseID = $page.params.course;

	let enrollments: Record<string, t.Enrollment> = {};
	let enrollmentsInit: Record<string, t.Enrollment> = {};

	function filterEnrollmentsByState(
		enrollments: Record<string, t.Enrollment>,
		state: t.Enum_Enrollment_State
	): Array<string> {
		return Object.keys(enrollments).filter((id) => {
			return enrollments[id].state == state;
		});
	}

	function resetInit() {
		enrollmentsInit = _.cloneDeep(enrollments);
	}

	function countApprovedEnrollments() {
		return Object.values(enrollments).filter((e) => {
			return e.state == t.Enum_Enrollment_State.Approved;
		}).length;
	}

	/**
	 * Fetching data
	 */

	const promise = (async () => {
		/**
		 * Getting enrollments
		 */

		// Getting enrollments
		const enrollmentsRes = await req.adminGetCourseEnrollments(courseID);

		enrollmentsRes.data.forEach((e) => {
			enrollments[e.id] = e.attributes;
		});

		// Updating backup
		resetInit();

		/**
		 * Course info
		 */

		// The course
		const course = await req.getCourseByID(
			$page.params.course,
			qs.stringify({ populate: ['meetings'] }, { encodeValuesOnly: true })
		);
		// Shorthand for attributes
		const c = course.data.attributes;

		// Array with enrollment attributes
		// Useful for extracting info with course helper functions
		const enrolls = enrollmentsRes.data.map((e) => e.attributes);

		const startDate = f.formatDateString(h.course.getStartDate(c));
		const deadlineDate = f.formatDateString(c.enrollmentDeadline);

		const canStart = h.course.canStart(c, enrolls);

		// Enrolls number and ratios

		const enrollsNum = enrolls.length;
		enrollsApprovedNum = enrolls.filter(
			(e) => e.state == t.Enum_Enrollment_State.Approved
		).length;

		const maxEnrollsExceeded = h.course.areMaxEnrollsExceeded(c, enrolls);

		const enrollsComparison = maxEnrollsExceeded
			? c.enrollmentMax
			: c.enrollmentMin;
		// const enrollsRatio

		const enrollsMessage = maxEnrollsExceeded
			? s.admin.enrollments.selectionNeeded
			: s.admin.enrollments.selectionNotNeeded;

		return {
			course: {
				...c,
				canStart,
				enrollsMessage,
				enrollsNum,
				// selectionRequired,
				// enrollmentsRatio,
				startDate,
				deadlineDate
			}
		};
	})();

	//

	const states = [
		t.Enum_Enrollment_State.Approved,
		t.Enum_Enrollment_State.Pending,
		t.Enum_Enrollment_State.Rejected,
		t.Enum_Enrollment_State.AwaitingPayment
	];

	let changed = false;
	$: {
		enrollments = enrollments;
		enrollsApprovedNum = countApprovedEnrollments();
		changed = !_.isEqual(enrollments, enrollmentsInit);
	}

	let openModal = false;

	//

	let tooltipContent: TooltipContent = null;

	//

	// Counts the number of enrollments approved
	let enrollsApprovedNum = 0;

	//

	async function save(e) {
		try {
			await req.adminUpdateEnrollments(enrollments);
			// Resetting
			resetInit();
			//
			tooltipContent = {
				state: 'positive',
				message: 'Iscrizioni aggiornate con successo!'
			};
		} catch (e) {
			tooltipContent = {
				state: 'negative',
				message: JSON.stringify(e)
			};
		}
	}

	function undo() {
		enrollments = _.cloneDeep(enrollmentsInit);
	}

	//

	async function notify() {
		try {
			await req.adminEnrollmentsNotify(courseID);
			tooltipContent = {
				state: 'positive',
				message: 'Gli utenti sono stati notificati!'
			};
		} catch (e) {
			tooltipContent = {
				state: 'negative',
				message: JSON.stringify(e)
			};
		}
	}
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<a class="backlink" href="/inside/admin/enrollments"
		>Torna alla lista dei corsi</a
	>

	<!-- Tabella con info -->

	<h1>{res.course.title}</h1>

	<table>
		<tr>
			<td> Stato </td>
			<td>
				{res.course.canStart ? '' : '⚠️'}
				Il corso {res.course.canStart ? '' : 'non'} può partire
			</td>
		</tr>
		<tr>
			<td> Selezione </td>
			<td>{res.course.enrollsMessage}</td>
		</tr>
		<tr>
			<td> Iscrizioni totali </td>
			<td
				>{res.course.enrollsNum} / min {res.course.enrollmentMin} / max {res
					.course.enrollmentMax}</td
			>
		</tr>
		<tr>
			<td>Iscrizioni approvate</td>
			<td
				>{enrollsApprovedNum} / min {res.course.enrollmentMin} / max
				{res.course.enrollmentMax}</td
			>
		</tr>
	</table>

	<!-- Notifica dell'iscrizione -->

	<button
		class="btn btn-tertiary btn-notify"
		on:click={() => {
			openModal = true;
		}}
	>
		Notifica gli utenti dell'iscrizione
	</button>

	<hr />

	<Modal title="Attenzione!" bind:open={openModal}>
		<p class="mb-2">
			Sei sicur* di notificare? <br />
			Verranno inviate mail di conferma ai partecipanti a cui è stata aggiornata
			l'iscrizione. <br />
		</p>
		<p class="mb-2">
			Per procedere, digita qui il titolo del corso
			<strong>{res.course.title}</strong>
		</p>
		<ModalConfirm match={res.course.title} onSubmit={notify} />
	</Modal>

	<!-- Liste con iscrizioni -->

	<div class="table-container">
		<table>
			{#each states as s}
				{@const enList = filterEnrollmentsByState(enrollments, s)}
				{@const enNum = enList.length}

				<tr>
					<th colspan="100">{enrollmentStatesAdmin[s]} ({enNum})</th>
				</tr>
				{#if enNum > 0}
					{#each enList as id}
						<CardEnrollment
							enrollment={enrollments[id]}
							bind:state={enrollments[id].state}
						/>
					{/each}
				{:else}
					<tr>
						<td colspan="100" style:color="gray"
							>Non ci sono iscrizioni in questa sezione</td
						>
					</tr>
				{/if}
			{/each}
		</table>
	</div>

	<!--  -->

	{#if changed}
		<div class="submit">
			<p>Ci sono cambiamenti</p>
			<div>
				<button class="btn btn-secondary" on:click={undo}>Annulla</button>
				<button class="btn btn-primary" on:click={save}>Salva!</button>
			</div>
		</div>
	{/if}

	<!--  -->

	<Tooltip content={tooltipContent} />
{:catch err}
	{err}
{/await}

<!--  -->
<style>
	.submit {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: var(--s-2) var(--s-3);
		background-color: #fff7cc;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.btn-notify {
		margin: var(--s-2) 0;
	}

	/*  */

	.table-container {
		overflow-x: auto;
	}

	table {
		border: none !important;
	}

	h1 {
		margin-bottom: var(--s-1);
	}

	th {
		border: none !important;
		padding-top: var(--s-3);
		font-size: 20px;
		padding-left: 0;
	}
</style>
