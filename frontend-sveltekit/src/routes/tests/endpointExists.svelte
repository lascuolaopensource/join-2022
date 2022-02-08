<script lang="ts">
	import { post, endpoints } from '$lib/requestUtils';

	async function test() {
		const res = await post(fetch, endpoints.checkUserExists, {
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
