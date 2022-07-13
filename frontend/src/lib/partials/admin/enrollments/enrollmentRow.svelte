<script lang="ts">
	import { writable } from 'svelte/store';
	import { types as t } from 'shared';
	import prependHttp from 'prepend-http';

	import Modal from '$lib/components/modal.svelte';

	import { Tr, Td } from '$lib/ui';
	import { Button } from '$lib/components';

	export let enrollment: t.Enrollment;
	export let state = enrollment.state;

	console.log(enrollment);

	const owner: t.UsersPermissionsUser = enrollment.owner?.data?.attributes;
	const ownerInfo: t.UserInfo = owner?.userInfo?.data?.attributes;

	//

	let showLetter = writable(false);

	function copy(s: string) {
		// var copyText = document.getElementById("content").value;
		navigator.clipboard.writeText(s).then(() => {
			// Alert the user that the action took place.
			// Nobody likes hidden stuff being done under the hood!
			alert('Copied to clipboard');
		});
	}

	function changeState(s: t.Enum_Enrollment_State) {
		state = s;
	}
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
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					copy(owner.email);
				}}
			>
				email
			</Button>
		{/if}

		<!-- Telefono -->
		<Button
			hierarchy="secondary"
			small
			on:click={() => {
				copy(enrollment.phoneNumber.data.attributes.number);
			}}
		>
			tel
		</Button>
	</Td>

	<!-- Valutazione -->

	<Td>
		<!-- CV -->
		{#if enrollment.cvUrl}
			<a
				class="btn btn-small btn-tertiary"
				href={prependHttp(enrollment.cvUrl)}
				target="_blank">CV [↗]</a
			>
		{/if}

		<!-- Portfolio -->
		{#if enrollment.portfolioUrl}
			<a
				class="btn btn-small btn-tertiary"
				href={prependHttp(enrollment.portfolioUrl)}
				target="_blank">Portfolio [↗]</a
			>
		{/if}

		<!-- Lettera motivazionale -->
		{#if enrollment.motivationalLetter}
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					$showLetter = true;
				}}>Lettera motivazionale</Button
			>
		{/if}
	</Td>

	<!-- Pulsanti di stato -->

	<Td>
		{#if state == t.Enum_Enrollment_State.AwaitingPayment}
			<!--  -->
		{:else if state == t.Enum_Enrollment_State.Approved}
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Rejected);
				}}
			>
				Rifiuta
			</Button>
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Pending);
				}}
			>
				Sposta in "Da approvare"
			</Button>
		{:else if state == t.Enum_Enrollment_State.Pending}
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Approved);
				}}
			>
				Approva
			</Button>
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Rejected);
				}}
			>
				Rifiuta
			</Button>
		{:else if state == t.Enum_Enrollment_State.Rejected}
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Approved);
				}}
			>
				Approva
			</Button>
			<Button
				hierarchy="secondary"
				small
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Pending);
				}}
			>
				Sposta in "Da approvare"
			</Button>
		{/if}
	</Td>
</Tr>

<Modal
	title="Lettera – {ownerInfo.name} {ownerInfo.surname}"
	visible={showLetter}
>
	{enrollment.motivationalLetter}
</Modal>
