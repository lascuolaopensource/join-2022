<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { helpers as h, types as t, formatters as f } from 'shared';
	import { page } from '$app/stores';
	import _ from 'lodash';
	import qs from 'qs';
	import { writable } from 'svelte/store';

	import type { TooltipContent } from '$lib/components/tooltip.svelte';
	import { s, enrollmentStatesAdmin } from '$lib/strings';

	import { Link, Title, Table, Th, Td, Tr } from '$lib/ui';
	import {
		Container,
		Button,
		BottomBar,
		Loading,
		Modal,
		ModalConfirm,
		Tooltip
	} from '$lib/components';

	import EnrollmentRow from '$lib/partials/admin/enrollments/enrollmentRow.svelte';

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

	function undo() {
		enrollments = _.cloneDeep(enrollmentsInit);
	}

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

	//

	const showModal = writable(false);
	const close = () => {
		$showModal = false;
	};
	const open = () => {
		$showModal = true;
	};
</script>

<!--  -->

<Container>
	{#await promise}
		<Loading />
	{:then res}
		<Link backlink margin href="/inside/admin/enrollments"
			>Torna alla lista dei corsi</Link
		>

		<!-- Tabella con info -->

		<Title margin>{res.course.title}</Title>

		<Table>
			<Tr>
				<Th>Stato</Th>
				<Td>
					{res.course.canStart ? '' : '⚠️'}
					Il corso {res.course.canStart ? '' : 'non'} può partire
				</Td>
			</Tr>
			<Tr>
				<Th>Selezione</Th>
				<Td>{res.course.enrollsMessage}</Td>
			</Tr>
			<Tr>
				<Th>Iscrizioni totali</Th>
				<Td
					>{res.course.enrollsNum} / min {res.course.enrollmentMin} / max {res
						.course.enrollmentMax}</Td
				>
			</Tr>
			<Tr>
				<Th>Iscrizioni approvate</Th>
				<Td
					>{enrollsApprovedNum} / min {res.course.enrollmentMin} / max
					{res.course.enrollmentMax}</Td
				>
			</Tr>
		</Table>

		<!-- Notifica dell'iscrizione -->

		<div class="my-6">
			<Button hierarchy="secondary" on:click={open}
				>Invia conferma di iscrizione agli utenti</Button
			>
		</div>

		<hr />

		<Modal visible={showModal} title="Attenzione!">
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

		<div class="mt-6">
			<Table>
				{#each states as s}
					{@const enList = filterEnrollmentsByState(enrollments, s)}
					{@const enNum = enList.length}

					<Tr>
						<Th colspan={100}
							>{enrollmentStatesAdmin[s]}

							{#if s == t.Enum_Enrollment_State.Approved}
								({enNum}/{res.course.enrollmentMin})
							{:else}
								({enNum})
							{/if}
						</Th>
					</Tr>
					{#if enNum > 0}
						{#each enList as id (id)}
							<EnrollmentRow
								enrollment={enrollments[id]}
								bind:state={enrollments[id].state}
							/>
						{/each}
					{:else}
						<Tr>
							<Td colspan={100}>
								<p class="font-gray-400">
									Non ci sono iscrizioni in questa sezione
								</p>
							</Td>
						</Tr>
					{/if}
				{/each}
			</Table>
		</div>

		<!--  -->

		<Tooltip content={tooltipContent} />
	{:catch err}
		{err}
	{/await}
</Container>

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
