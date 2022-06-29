<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { toolDates, toolNeeds } from '$lib/stores';

	afterNavigate(({ from, to }) => {
		if (from) {
			if (from.pathname == '/inside/tools/recap') {
				$toolDates = [];
				$toolNeeds = [];
			}
		}
	});
</script>

<!--  -->

Prenotazione confermata!
