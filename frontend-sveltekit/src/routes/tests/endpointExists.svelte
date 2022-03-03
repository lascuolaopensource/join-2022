<script lang="ts">
	import { req } from '$lib/requestUtils';

	async function test() {
		const res = await req.userExists({username: "bno"})
		return res;
	}

	const promise = test();
</script>

{#await promise}
	loading...
{:then res}
	<pre>
		{JSON.stringify(res, null, 4)}
	</pre>
{:catch err}
	{err}
{/await}
