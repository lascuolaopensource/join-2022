<script lang="ts">
	export let fieldName: string; // The field name

	export let text = '';
	export let icon: Function = null;
	export let link: { text: string; href: string } = null;
</script>

<!--  -->

{#if text}
	<div class="field__top">
		<!-- Label -->
		<div class="field__label">
			<!-- Icon -->
			{#if icon}
				<svelte:component this={icon} class="field__label__icon" />
			{/if}
			<!-- Label text -->
			<label class="field__label__text" for={fieldName}>{text}</label>
		</div>
		<!-- Right-side link -->
		{#if link}
			<a class="field__label__link" href={link.href}>{link.text}</a>
		{/if}
	</div>
{/if}
