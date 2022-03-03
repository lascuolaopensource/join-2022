<script lang="ts">
	import { request, endpoints } from '$lib/requestUtils';

	async function test() {
		const res = await request(fetch, endpoints.checkUserExists, 'POST', {
			username: 'bbtgn' // Should return false
		});
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
