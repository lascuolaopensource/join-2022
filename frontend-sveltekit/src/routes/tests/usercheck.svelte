<script lang="ts">
	import { post } from '$lib/helpers/requestUtils';

	async function test() {
		try {
			const res = await post(fetch, `http://localhost:1337/exists`, {
				email: 'bbt.gnn@gmail.com', // TRUE
				// email: 'dasdsa', // FALSE
				username: 'bbtgnn', // TRUE
				// username: 'sdsad' // FALSE
				nonExistingProperty: 12 // Bad request
			});
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

	test();
</script>

ciao
