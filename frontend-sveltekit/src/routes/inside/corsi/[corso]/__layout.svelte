<script lang="ts">
	import { page } from '$app/stores';
	import { GQLCLient } from '$lib/requestUtils';
	import { course } from '$lib/stores';

	import { Loading } from '$lib/components';

	//

	const client = GQLCLient();
	const slug = $page.params.corso;

	async function getCorso() {
		// Fetching the course basic info (id, title, slug)
		const data = await client.getCourseBySlug({ slug });
		// And we save it the store
		$course = data.courses.data[0];
	}

	const promise = getCorso();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then ok}
	<slot />
{:catch error}
	{error}
{/await}
