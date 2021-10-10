<script lang="ts">
	export let value = '';
	export let label = '';
	export let type: 'text' | 'email' | 'password' = 'text';
	export let placeholder = '';
	export let required = true;
	export let link: { label: string; href: string } = null;

	import { uid } from 'uid';
	const id = uid(5);
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
	{#if type == 'text'}
		<input {id} bind:value type="text" {placeholder} {required} />
	{:else if type == 'email'}
		<input {id} bind:value type="email" {placeholder} {required} />
	{:else if type == 'password'}
		<input {id} bind:value type="password" {placeholder} {required} />
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
</style>
