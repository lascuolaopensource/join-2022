<script lang="ts">
	import TitleAndLink from '$lib/components/TitleAndLink.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<TitleAndLink title="Account created!" />
<p>Please check your inbox for the confirmation email, and click the link inside</p>
