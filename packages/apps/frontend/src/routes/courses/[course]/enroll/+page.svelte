<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const c = data.attributes!;
</script>

Enroll!
{c.name}
