<script lang="ts">
	export let id: string;
	export let value = '';
	export let label = '';
	export let type: 'text' | 'email' | 'password' = 'text';
	export let placeholder = '';
	export let required = true;
	export let link: { label: string; href: string } = null;
	export let tabindex = 0;
	export let error = '';

	// This is needed to change dynamically the type of the input
	// Solution provided by
	// https://github.com/sveltejs/svelte/issues/3921#issuecomment-880664654
	const setType = (node) => {
		node.type = type;
	};
</script>

<!-- Markup -->

<div>
	<!-- Label -->
	<div class="top">
		{#if label != ''}
			<label for={id}>{label}</label>
		{/if}
		{#if link}
			<a href={link.href}>{link.label}</a>
		{/if}
	</div>
	<!-- Field -->
	<input
		use:setType
		bind:value
		on:input={() => {
			error = '';
		}}
		on:blur
		{id}
		{placeholder}
		{required}
		{tabindex}
		class:error={error != ''}
	/>
	<!-- Error -->
	{#if error}
		<p class="errorMsg">{error}</p>
	{/if}
</div>

<!-- Style -->
<style>
	div,
	input {
		width: 100%;
	}

	div {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--s-1);
	}

	.top {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0;
	}

	a {
		font-size: var(--text-small);
		line-height: var(--text-small-lh);
	}

	.errorMsg {
		color: var(--alert-color);
		font-size: var(--text-small);
		line-height: var(--text-small-lh);
	}
</style>
