<script lang="ts">
	import { page } from '$app/stores';
	import { req } from '$lib/requestUtils';

	const query = JSON.parse(decodeURIComponent($page.params.query));
	const promise = req.checkSlots({ days: query });
</script>

<!--  -->

<pre>{JSON.stringify(query, null, 2)}</pre>
{#await promise then res}
	<pre>{JSON.stringify(res, null, 2)}</pre>
{/await}
