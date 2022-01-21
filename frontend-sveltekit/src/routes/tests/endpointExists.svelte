<script lang="ts">
	import { post, endpoints } from '$lib/requestUtils';

	//

	async function test() {
		try {
			const res = await post(fetch, endpoints.checkUserExists, {
				username: 'bbtgn' // Should return false
			});
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

	//

	test();
</script>

<!-- --- Markup --- -->

ciao
