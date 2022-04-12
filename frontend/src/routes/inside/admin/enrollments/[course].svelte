<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { types as t } from 'shared';
	import { page } from '$app/stores';
	import _ from 'lodash';

	import {
		Loading,
		CardEnrollment,
		Modal,
		ModalConfirm,
		Tooltip
	} from '$lib/components';
	import { setFormError } from '$lib/components/form';
	import { navHgt } from '$lib/components/navbarMain.svelte';

	//

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

	const promise = (async () => {
		// The course
		const course = await req.getCourseByID($page.params.course);

		// Getting enrollments
		const enrollmentsRes = await req.adminGetCourseEnrollments(course.data.id);

		console.log();

		// Storing enrollments
		enrollmentsRes.data.forEach((e) => {
			enrollments[e.id] = e.attributes;
		});

		// Updating backup
		resetInit();

		// Course info
		const enrollmentsNum = enrollmentsRes.data.length;
		const enrollmentsMin = course.data.attributes.enrollmentMin;
		const enrollmentsMax = course.data.attributes.enrollmentMax;
		const activated = enrollmentsMin <= enrollmentsNum;
		const selectionRequired = enrollmentsNum > enrollmentsMax;
		const enrollmentsRatio = `${enrollmentsNum} / ${enrollmentsMin}`;

		return {
			course: {
				title: course.data.attributes.title,
				activated,
				selectionRequired,
				enrollmentsRatio
			}
		};
	})();

	//

	const states = Object.values(t.Enum_Enrollment_State);

	let changed = false;
	$: {
		console.log(enrollments);
		enrollments = enrollments;
		changed = !_.isEqual(enrollments, enrollmentsInit);
	}

	let openModal = false;

	function open() {
		openModal = true;
	}

	function undo() {
		enrollments = _.cloneDeep(enrollmentsInit);
	}

	//

	async function onSubmit() {
		try {
			await req.adminUpdateEnrollments(enrollments);
			// Resetting
			resetInit();
			//
			showTooltip = true;
		} catch (e) {
			setFormError(e);
		}
	}

	let showTooltip = false;
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<div>
		<h2>{res.course.title}</h2>
		<p>Iscrizioni totali: {res.course.enrollmentsRatio}</p>
		<p>Il corso {res.course.activated ? '' : 'non'} è attivato</p>
		{#if res.course.selectionRequired}
			<p>
				È richiesta selezione degli iscritti: è stato superato il numero massimo
			</p>
		{/if}
	</div>

	<hr />

	<div class="space-between" class:mb-5={changed}>
		{#each states as s}
			{@const IDList = filterEnrollmentsByState(enrollments, s)}
			{@const enNum = IDList.length}
			{@const editable = s != t.Enum_Enrollment_State.AwaitingPayment}

			<h1 style:top="{$navHgt}px">{s} ({enNum})</h1>
			{#if enNum > 0}
				{#each IDList as id}
					<CardEnrollment
						enrollment={enrollments[id]}
						{editable}
						bind:state={enrollments[id].state}
					/>
				{/each}
			{:else}
				<p style:color="gray">Non ci sono iscrizioni in questa sezione</p>
			{/if}
		{/each}
	</div>

	<!--  -->

	{#if changed}
		<div class="submit">
			<p>Ci sono cambiamenti</p>
			<div>
				<button class="btn btn-secondary" on:click={undo}>Annulla</button>
				<button class="btn btn-primary" on:click={open}>Salva!</button>
			</div>
		</div>
	{/if}

	<!--  -->

	<Modal title="Attenzione!" bind:open={openModal}>
		<p class="mb-2">
			Sei sicur* di approvare i cambiamenti? <br />
			Verranno inviate mail di conferma ai partecipanti a cui è stata aggiornata
			l'iscrizione. <br />
		</p>
		<p class="mb-2">
			Per procedere, digita qui il titolo del corso
			<strong>{res.course.title}</strong>
		</p>
		<ModalConfirm match={res.course.title} {onSubmit} />
	</Modal>

	<!--  -->

	<Tooltip visible={showTooltip}>Iscrizioni aggiornate con successo!</Tooltip>
{:catch err}
	{err}
{/await}

<!--  -->
<style>
	h1 {
		padding: var(--s-2) 0;
		position: sticky;
		background-color: white;
	}

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

	.mb-5 {
		margin-bottom: var(--s-5);
	}

	.mb-2 {
		margin-bottom: var(--s-2);
	}
</style>
