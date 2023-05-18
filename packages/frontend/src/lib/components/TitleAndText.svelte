<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';

	export let title: string | null = null;
	export let text: string | null = null;
	export let reverse: boolean = false;
</script>

{#if title || text}
	<div class="flex" class:flex-col={!reverse} class:flex-col-reverse={reverse}>
		{#if title}
			<Heading tag="h3">{title}</Heading>
		{/if}
		{#if title && text}
			<div class="h-1" />
		{/if}
		{#if text}
			<P>{text}</P>
		{/if}
	</div>
{/if}
