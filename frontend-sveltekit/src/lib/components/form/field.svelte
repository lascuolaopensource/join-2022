<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './key';
	import get from 'get-value';

	import FieldError from './fieldError.svelte';

	// Logic props
	export let name: string;
	export let type: 'text' | 'email' | 'password' = 'text';
	// Label props
	export let label = '';
	export let labelIcon: Function = null;
	export let link: { text: string; href: string } = null;
	// Input props
	export let placeholder = '';
	// Bottom props
	export let helperText = '';

	const { form, errors, handleChange } = getContext(key);

	// This is needed to change dynamically the type of the input
	// Solution provided by
	// https://github.com/sveltejs/svelte/issues/3921#issuecomment-880664654
	const setType = (node) => {
		node.type = type;
	};
</script>

<div class="field">
	<!-- Label -->

	<div class="field__top">
		<!-- Label -->
		{#if label}
			<div class="field__label">
				<!-- Icon -->
				{#if labelIcon}
					<svelte:component this={labelIcon} class="field__label__icon" />
				{/if}
				<!-- Label text -->
				<label class="field__label__text" for={name}>{label}</label>
			</div>
		{/if}
		<!-- Right-side link -->
		{#if link}
			<a class="field__label__link" href={link.href}>{link.text}</a>
		{/if}
	</div>

	<!-- Input -->

	<input
		use:setType
		{name}
		id={name}
		value={get($form, name)}
		{placeholder}
		on:change={handleChange}
		on:blur={handleChange}
		{...$$props}
		class="field__input"
		class:field__input-error={get($errors, name)}
	/>

	<!-- Bottom part -->

	{#if helperText || get($errors, name)}
		<div class="field__bottom">
			<!-- Helper text -->
			{#if helperText}
				<small class="field__helperText">{helperText}</small>
			{/if}
			<!-- Field error -->
			<FieldError {name} />
		</div>
	{/if}
</div>
