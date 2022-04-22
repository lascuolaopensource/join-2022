<script lang="ts">
	import { types as t } from 'shared';
	import prependHttp from 'prepend-http';

	import Modal from './modal.svelte';

	export let enrollment: t.Enrollment;
	export let state = enrollment.state;

	console.log(enrollment);

	const owner: t.UsersPermissionsUser = enrollment.owner?.data.attributes;
	const ownerInfo: t.UserInfo = owner?.userInfo?.data.attributes;

	//

	let showLetter = false;

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

<tr class="en-card">
	<!-- Nome e cognome -->
	<td class="info">
		{#if ownerInfo}
			<p>
				{ownerInfo.name}
				{ownerInfo.surname}
			</p>
		{/if}
	</td>

	<!-- Contatti -->

	<td class="contacts">
		<!-- Email -->
		{#if owner}
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					copy(owner.email);
				}}
			>
				email
			</button>
		{/if}

		<!-- Telefono -->
		<button
			class="btn btn-small btn-tertiary"
			on:click={() => {
				copy(enrollment.phoneNumber.data.attributes.number);
			}}
		>
			tel
		</button>
	</td>

	<!-- Valutazione -->

	<td class="ev">
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
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					showLetter = true;
				}}>Lettera motivazionale</button
			>
		{/if}
	</td>

	<!-- Pulsanti di stato -->

	<td class="state">
		{#if state == t.Enum_Enrollment_State.AwaitingPayment}
			<!--  -->
		{:else if state == t.Enum_Enrollment_State.Approved}
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Rejected);
				}}
			>
				Rifiuta
			</button>
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Pending);
				}}
			>
				Sposta in "Da approvare"
			</button>
		{:else if state == t.Enum_Enrollment_State.Pending}
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Approved);
				}}
			>
				Approva
			</button>
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Rejected);
				}}
			>
				Rifiuta
			</button>
		{:else if state == t.Enum_Enrollment_State.Rejected}
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Approved);
				}}
			>
				Approva
			</button>
			<button
				class="btn btn-small btn-tertiary"
				on:click={() => {
					changeState(t.Enum_Enrollment_State.Pending);
				}}
			>
				Sposta in "Da approvare"
			</button>
		{/if}
	</td>
</tr>

<Modal
	title="Lettera – {ownerInfo.name} {ownerInfo.surname}"
	bind:open={showLetter}
>
	{enrollment.motivationalLetter}
</Modal>

<!--  -->
<style>
	.info p {
		color: gray;
	}
</style>
