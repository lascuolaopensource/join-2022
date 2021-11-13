<script lang="ts">
	import { variables } from '$lib/variables';
	import { post } from '$lib/helpers/requestUtils';

	async function test() {
		try {
			const res = await post(fetch, variables.backendUrl + `/exists`, {
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
