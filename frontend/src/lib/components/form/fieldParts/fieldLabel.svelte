<script lang="ts">
	export let fieldName: string; // The field name

	export let text = '';
	export let icon: Function | null = null;
	export let link: { text: string; href: string } | null = null;

	import { Link } from '$lib/ui';
</script>

<!--  -->

{#if text}
	<div class="flex flex-row flex-nowrap items-center justify-between">
		<!-- Label -->
		<div class="flex flex-row flex-nowrap items-center justify-start">
			<!-- Icon -->
			{#if icon}
				<svelte:component this={icon} class="fill-gray-700" />
			{/if}
			<!-- Label text -->
			<label class="ml-1 text-gray-700" for={fieldName}>{text}</label>
		</div>

		<!-- Right-side link -->
		{#if link}
			<Link href={link.href} size="sm">{link.text}</Link>
		{/if}
	</div>
{/if}
