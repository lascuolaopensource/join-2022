<script lang="ts">
	export let errorMsg: string = '';
	export let closeButton: boolean = true;

	import { icons } from '$lib/icons';
	import IconButton from './iconButton.svelte';
</script>

{#if errorMsg}
	<div>
		<svelte:component this={icons.alert} class="iconPrimary-d" />
		<p>
			{errorMsg}
		</p>
		{#if closeButton}
			<IconButton
				icon={icons.close}
				mode="dark"
				on:click={() => {
					errorMsg = '';
				}}
			/>
		{/if}
	</div>
{/if}

<style>
	div {
		width: 100%;
		padding: var(--s-2);
		background-color: var(--alert-color);
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	p {
		width: 100%;
		color: var(--content-primary-d);
		margin: 0 var(--s-2);
	}
</style>
