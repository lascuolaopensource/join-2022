<script lang="ts">
	import { post } from '$lib/helpers/requestUtils';

	let username = 'bbtgnn';

	async function test() {
		const res = await post(
			fetch,
			`http://localhost:1337/username/check/${username}`,
			{
				ciao: 'ok'
			}
		);
		console.log(res);
	}

	test();
</script>

ciao
