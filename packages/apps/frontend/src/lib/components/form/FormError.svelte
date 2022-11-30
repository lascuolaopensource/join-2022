<script lang="ts">
	import { Alert } from 'flowbite-svelte';

	export let error: string | undefined | null;
</script>

<Alert color="red" dismissable data-test="error">
	{error}
</Alert>
