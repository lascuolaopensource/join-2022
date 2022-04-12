<script lang="ts">
	import { types as t } from 'shared';
	import prependHttp from 'prepend-http';

	import Modal from './modal.svelte';

	export let enrollment: t.Enrollment;
	export let editable = false;
	export let state = enrollment.state;

	const owner: t.UsersPermissionsUser = enrollment.owner?.data.attributes;
	const ownerInfo: t.UserInfo = owner?.userInfo?.data.attributes;

	//

	let showLetter = false;
</script>

<!--  -->

<div class="en-card">
	<div class="info">
		<!-- Nome e cognome -->
		{#if ownerInfo}
			<p>
				{ownerInfo.name}
				{ownerInfo.surname}
			</p>
		{/if}

		<!-- Email -->
		{#if owner}
			<p style:color="gray">{owner.email}</p>
		{/if}
	</div>

	<div class="ev">
		<!-- CV -->
		{#if enrollment.cvUrl}
			<a class="ev-btn" href={prependHttp(enrollment.cvUrl)} target="_blank"
				>CV [↗]</a
			>
		{/if}

		<!-- Portfolio -->
		{#if enrollment.portfolioUrl}
			<a
				class="ev-btn"
				href={prependHttp(enrollment.portfolioUrl)}
				target="_blank">Portfolio [↗]</a
			>
		{/if}

		<!-- Lettera motivazionale -->
		{#if enrollment.motivationalLetter}
			<button
				class="ev-btn"
				on:click={() => {
					showLetter = true;
				}}>Lettera motivazionale</button
			>
		{/if}
	</div>

	<hr />

	<div>
		<p>Stato</p>
		<select bind:value={state} disabled={!editable}>
			{#each Object.values(t.Enum_Enrollment_State) as s}
				<option value={s}>
					{s}
				</option>
			{/each}
		</select>
	</div>
</div>

<Modal
	title="Lettera – {ownerInfo.name} {ownerInfo.surname}"
	bind:open={showLetter}
>
	{enrollment.motivationalLetter}
</Modal>

<!--  -->
<style>
	.en-card {
		padding: var(--s-2);
		border: 1px solid lightgray;
	}

	.ev {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		overflow-x: auto;
		gap: var(--s-1);
		margin-top: var(--s-2);
	}

	.ev-btn {
		flex-shrink: 0;
		text-decoration: none;
		padding: var(--s-1);
		display: block;
		width: fit-content;
		background-color: lightgray;
		border: none;
		color: black;
	}

	select {
		padding: var(--s-1);
		width: 100%;
	}

	.ev-btn:active {
		background-color: gray;
	}

	hr {
		margin: var(--s-2) 0;
		border: none;
		border-top: 1px solid lightgray;
	}
</style>
