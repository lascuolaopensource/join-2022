<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';

	export let title: string | null = null;
	export let link: { href: string; text: string } | null = null;
</script>

{#if title || link}
	<div class="space-y-2">
		{#if title}
			<Heading tag="h3" class="text-xs-center">{title}</Heading>
		{/if}
		{#if link}
			<P><A href={link.href}>{link.text}</A></P>
		{/if}
	</div>
{/if}
