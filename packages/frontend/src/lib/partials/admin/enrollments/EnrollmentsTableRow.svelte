<script lang="ts">
	import { writable } from 'svelte/store';
	import { types as t } from 'join-shared';
	import prependHttp from 'prepend-http';
	import { copy } from '$lib/utils/copy';

	import { TableBodyCell, TableBodyRow, Button, Modal } from 'flowbite-svelte';
	import Copy from 'carbon-icons-svelte/lib/Copy.svelte';

	//

	export let enrollment: t.EnrollmentEntity;
	export let canEdit: boolean;

	/**
	 * Data variables
	 */

	const owner = enrollment.attributes?.owner?.data?.attributes;
	const ownerInfo = owner?.info?.data?.attributes;

	const cvUrl = enrollment.attributes?.cvUrl;
	const portfolioUrl = enrollment.attributes?.portfolioUrl;
	const motivationalLetter = enrollment.attributes?.motivationalLetter;
	const evaluation = cvUrl || portfolioUrl || motivationalLetter;

	/**
	 * Copy functions
	 */

	function copyEmail() {
		copy(owner?.email);
	}

	function copyPhone() {
		const phone = enrollment.attributes?.phoneNumber;
		copy(phone);
	}

	/**
	 * State functions
	 */

	function changeState(s: t.Enum_Enrollment_State) {
		enrollment.attributes!.state = s;
	}

	function setPending() {
		changeState(t.Enum_Enrollment_State.Pending);
	}

	function setApproved() {
		changeState(t.Enum_Enrollment_State.Approved);
	}

	function setRejected() {
		changeState(t.Enum_Enrollment_State.Rejected);
	}

	/**
	 * Writable for modal
	 */

	let showLetter = false;
	const openLetter = () => (showLetter = true);
</script>

<!--  -->

<TableBodyRow>
	<!-- Nome e cognome -->
	<TableBodyCell>
		{#if ownerInfo}
			<p>
				{ownerInfo.name}
				{ownerInfo.surname}
			</p>
		{/if}
	</TableBodyCell>

	<!-- Contatti -->
	<TableBodyCell>
		<!-- Email -->
		{#if owner}
			<Button color="alternative" size="xs" on:click={copyEmail}>
				<span class="mr-1">Email</span><Copy />
			</Button>
		{/if}

		<!-- Telefono -->
		<Button color="alternative" size="xs" on:click={copyPhone}>
			<span class="mr-1">Phone</span><Copy />
		</Button>
	</TableBodyCell>

	<!-- Valutazione -->
	{#if evaluation}
		<TableBodyCell>
			<!-- CV -->
			{#if cvUrl}
				<Button href={prependHttp(cvUrl)} target="_blank" color="alternative" size="xs"
					>CV [↗]</Button
				>
			{/if}

			<!-- Portfolio -->
			{#if portfolioUrl}
				<Button
					href={prependHttp(portfolioUrl)}
					target="_blank"
					color="alternative"
					size="xs">Portfolio [↗]</Button
				>
			{/if}

			<!-- Lettera motivazionale -->
			{#if motivationalLetter}
				<Button color="alternative" size="xs" on:click={openLetter}>Letter</Button>
			{/if}
		</TableBodyCell>
	{/if}

	<!-- Pulsanti di stato -->
	{#if canEdit}
		<TableBodyCell>
			<!-- Shortcut for state -->
			{@const state = enrollment.attributes?.state}

			<!-- It's possible to take action if the enrollment is not awaitingPayment -->
			{#if state != t.Enum_Enrollment_State.AwaitingPayment}
				<!-- If not approved, can be set as approved -->
				{#if state != t.Enum_Enrollment_State.Approved}
					<Button color="green" size="xs" on:click={setApproved}>Approva</Button>
				{/if}

				<!-- If not pending, can be set as pending -->
				{#if state != t.Enum_Enrollment_State.Pending}
					<Button color="yellow" size="xs" on:click={setPending}
						>Sposta in "Da approvare"</Button
					>
				{/if}

				<!-- If not rejected, can be set as rejected -->
				{#if state != t.Enum_Enrollment_State.Rejected}
					<Button color="red" size="xs" on:click={setRejected}>Rifiuta</Button>
				{/if}
			{/if}
		</TableBodyCell>
	{/if}
</TableBodyRow>

<!-- Modal to display motivational letter -->
{#if motivationalLetter && ownerInfo}
	<!-- Modal title -->
	{@const title = `Letter – ${ownerInfo.name} ${ownerInfo.surname}`}

	<!-- The modal -->
	<Modal {title} bind:open={showLetter}>
		{motivationalLetter}
	</Modal>
{/if}
