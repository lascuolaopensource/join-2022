<script lang="ts">
	export let id: string;
	export let value = '';
	export let label = '';
	export let type: 'text' | 'email' | 'password' = 'text';
	export let placeholder = '';
	export let required = true;
	export let link: { label: string; href: string } = null;
	export let tabindex = 0;
	export let error: string = null;
	export let helperText = '';
	export let labelIcon: Function = null;

	import { icons } from '$lib/icons';

	// This is needed to change dynamically the type of the input
	// Solution provided by
	// https://github.com/sveltejs/svelte/issues/3921#issuecomment-880664654
	const setType = (node) => {
		node.type = type;
	};

	const clearError = () => {
		error = null;
	};
</script>

<!-- Markup -->

<div class="container">
	<!-- Label -->
	<div class="top">
		{#if label != ''}
			<div class="labelContainer">
				<svelte:component this={labelIcon} class="fieldLabelIcon" />
				<label for={id}>{label}</label>
			</div>
		{/if}
		{#if link}
			<a href={link.href}><small>{link.label}</small></a>
		{/if}
	</div>

	<!-- Field -->
	<div class="field">
		<input
			use:setType
			bind:value
			on:input={clearError}
			on:blur
			{id}
			{placeholder}
			{required}
			{tabindex}
			class:error
		/>
	</div>

	<!-- Sub-text -->
	{#if helperText || error}
		<div class="bottom">
			{#if helperText}
				<small class="tertiary">{helperText}</small>
			{/if}
			{#if error}
				<div class="errorContainer">
					<svelte:component this={icons.fields.error} class="fieldErrorIcon" />
					<small class="errorMsg">{error}</small>
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Style -->
<style>
	.container,
	.top,
	.field,
	input,
	.bottom {
		width: 100%;
	}

	.container {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--s-1);
	}

	/* Top part */

	.top {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0;
	}

	.labelContainer {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--s-1);
	}

	label {
		color: var(--content-secondary);
	}

	/* Field */

	.field {
		position: relative;
	}

	/* Bottom part */

	.bottom {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--s-0);
	}

	.errorContainer {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--s-0);
	}

	.errorMsg {
		color: var(--alert-color);
	}
</style>
