<script lang="ts">
	import { writable } from 'svelte/store';
	import { types as t } from 'shared';
	import prependHttp from 'prepend-http';
	import { copy } from '$lib/utils';

	import Modal from '$lib/components/modal.svelte';
	import { Tr, Td, Button, ButtonLink } from '$lib/components';

	//

	export let enrollment: t.EnrollmentEntity;
	export let isCourseConfirmed: boolean;

	/**
	 * Data variables
	 */

	const owner = enrollment.attributes?.owner?.data?.attributes;
	const ownerInfo = owner?.userInfo?.data?.attributes;

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
		const phone = enrollment.attributes?.phoneNumber.data?.attributes?.number;
		copy(phone);
	}

	/**
	 * State functions
	 */

	function changeState(s: t.Enum_Enrollment_State) {
		if (enrollment.attributes) {
			enrollment.attributes.state = s;
		}
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

	let showLetter = writable(false);
</script>

<!--  -->

<Tr>
	<!-- Nome e cognome -->
	<Td>
		{#if ownerInfo}
			<p>
				{ownerInfo.name}
				{ownerInfo.surname}
			</p>
		{/if}
	</Td>

	<!-- Contatti -->
	<Td>
		<!-- Email -->
		{#if owner}
			<Button hierarchy="secondary" small on:click={copyEmail}>email</Button>
		{/if}

		<!-- Telefono -->
		<Button hierarchy="secondary" small on:click={copyPhone}>tel</Button>
	</Td>

	<!-- Valutazione -->
	{#if evaluation}
		<Td>
			<!-- CV -->
			{#if cvUrl}
				<ButtonLink href={prependHttp(cvUrl)} blank small>CV [↗]</ButtonLink>
			{/if}

			<!-- Portfolio -->
			{#if portfolioUrl}
				<ButtonLink href={prependHttp(portfolioUrl)} blank small>
					Portfolio [↗]
				</ButtonLink>
			{/if}

			<!-- Lettera motivazionale -->
			{#if motivationalLetter}
				<Button
					hierarchy="secondary"
					small
					on:click={() => {
						$showLetter = true;
					}}>Lettera motivazionale</Button
				>
			{/if}
		</Td>
	{/if}

	<!-- Pulsanti di stato -->
	{#if !isCourseConfirmed}
		<Td>
			<!-- Shortcut for state -->
			{@const state = enrollment.attributes?.state}

			<!-- It's possible to take action if the enrollment is not awaitingPayment -->
			{#if state != t.Enum_Enrollment_State.AwaitingPayment}
				<!-- If not approved, can be set as approved -->
				{#if state != t.Enum_Enrollment_State.Approved}
					<Button hierarchy="secondary" small on:click={setApproved}>
						Approva
					</Button>
				{/if}

				<!-- If not pending, can be set as pending -->
				{#if state != t.Enum_Enrollment_State.Pending}
					<Button hierarchy="secondary" small on:click={setPending}>
						Sposta in "Da approvare"
					</Button>
				{/if}

				<!-- If not rejected, can be set as rejected -->
				{#if state != t.Enum_Enrollment_State.Rejected}
					<Button hierarchy="secondary" small on:click={setRejected}>
						Rifiuta
					</Button>
				{/if}
			{/if}
		</Td>
	{/if}
</Tr>

<!-- Modal to display motivational letter -->
{#if motivationalLetter && ownerInfo}
	<!-- Modal title -->
	{@const title = `Lettera – ${ownerInfo.name} ${ownerInfo.surname}`}

	<!-- The modal -->
	<Modal {title} visible={showLetter}>
		{motivationalLetter}
	</Modal>
{/if}
