<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { tools } from '$lib/stores';

	import {
		NavbarSecondary,
		NavbarItem,
		Container,
		Loading
	} from '$lib/components';

	//

	const promise = (async () => {
		if (!$tools.length) {
			const res = await req.getTools();
			$tools = [...res.data];
		}
	})();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<NavbarSecondary>
		<NavbarItem href="/inside/admin/tools/manageAvailability"
			>Gestione disponibilità</NavbarItem
		>
	</NavbarSecondary>

	<Container>
		<slot />
	</Container>
{/await}
