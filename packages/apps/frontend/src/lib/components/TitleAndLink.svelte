<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';

	export let title: string | null = null;
	export let link: { href: string; text: string } | null = null;
	export let reverse: boolean = false;
</script>

{#if title || link}
	<div class="flex" class:flex-col={!reverse} class:flex-col-reverse={reverse}>
		{#if title}
			<Heading tag="h3" class="text-xs-center">{title}</Heading>
		{/if}
		{#if title && link}
			<div class="h-2" />
		{/if}
		{#if link}
			<P><A href={link.href}>{link.text}</A></P>
		{/if}
	</div>
{/if}
