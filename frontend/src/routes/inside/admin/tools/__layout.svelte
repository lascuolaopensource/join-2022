<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { tools } from '$lib/stores';

	import { NavbarSecondary, NavbarItem, Loading } from '$lib/components';

	//

	const promise = (async () => {
		if (!$tools.length) {
			// Getting tools
			const res = await req.getTools();
			// Converting ids to string
			// Query gives back integer ids
			// While generated types have string
			const data = res.data.map((s) => {
				s.id = s.id?.toString();
				return s;
			});
			// Updating store
			$tools = [...data];
		}
	})();
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<NavbarSecondary>
		<NavbarItem href="/inside/admin/tools/manageAvailability">
			Gestione disponibilità
		</NavbarItem>
	</NavbarSecondary>

	<slot />
{/await}
