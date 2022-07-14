<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { toolDates, toolNeeds } from '$lib/stores';
	import { Container, Title, Link } from '$lib/components';

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

<Container>
	<Title margin>Prenotazione confermata!</Title>
	<Link href="/inside" backlink>Torna alla home</Link>
</Container>
