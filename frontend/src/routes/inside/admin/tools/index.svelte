<script lang="ts">
	import { tools } from '$lib/stores';
	import { MiniCal } from '$lib/components';

	const start = new Date();
</script>

<!--  -->

<MiniCal {start} />
<pre>{JSON.stringify($tools, null, 2)}</pre>
