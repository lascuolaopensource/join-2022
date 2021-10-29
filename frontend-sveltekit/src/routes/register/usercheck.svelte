<script lang="ts">
	import { post } from '$lib/helpers/requestUtils';

	let email = 'bbt.gnn@gmail.com';

	async function test() {
		const res = await post(fetch, `http://localhost:1337/exists`, {
			email
		});
		console.log(res);
	}

	test();
</script>

ciao
