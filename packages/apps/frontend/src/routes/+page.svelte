<script lang="ts">
	import type { LayoutData } from './$types';
	import { Heading } from 'flowbite-svelte';

	export let data: LayoutData;
</script>

<Heading tag="h2">Ciao {data.user?.info.name}!</Heading>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
