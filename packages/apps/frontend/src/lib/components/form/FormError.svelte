<script lang="ts">
	import { Alert } from 'flowbite-svelte';

	export let error: string | undefined | null;
</script>

{#if error}
	<Alert color="red" dismissable data-test="error">
		{error}
	</Alert>
{/if}
