<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';
	import type { AnchorPropOptional } from './types';

	export let title: string | null = null;
	export let link: AnchorPropOptional = undefined;
	export let reverse: boolean = false;
</script>

{#if title || link}
	<div
		class:flex-col={!reverse}
		class:flex-col-reverse={reverse}
		class:space-y-reverse={reverse}
		class="flex space-y-2"
	>
		{#if title}
			<Heading tag="h3" class="text-xs-center">{title}</Heading>
		{/if}

		{#if link}
			<P><A href={link.href}>{link.text}</A></P>
		{/if}
	</div>
{/if}
