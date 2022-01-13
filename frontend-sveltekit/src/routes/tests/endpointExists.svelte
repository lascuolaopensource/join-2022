<script lang="ts">
	import { endpoints } from '$lib/requestUtils/endpoints';
	import post from '$lib/requestUtils/post';

	//

	async function test() {
		try {
			const res = await post(fetch, endpoints.checkUserExists + `/userExists`, {
				username: 'bbtgn' // Should return true
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
