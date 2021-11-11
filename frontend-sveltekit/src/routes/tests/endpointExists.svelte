<script lang="ts">
	import { post } from '$lib/helpers/requestUtils';

	async function test() {
		try {
			const res = await post(fetch, `http://localhost:1337/exists`, {
				username: 'bbtgnn' // TRUE
			});
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

	test();
</script>

ciao
