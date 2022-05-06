<script lang="ts">
	import { page } from '$app/stores';
	import { req } from '$lib/requestUtils';

	const query = JSON.parse(decodeURIComponent($page.params.query));
</script>

<pre>{JSON.stringify(query, null, 2)}</pre>
