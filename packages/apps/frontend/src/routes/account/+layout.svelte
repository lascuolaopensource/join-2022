<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import { Heading, P, A, Card } from 'flowbite-svelte';
</script>

<Container center>
	<div class="basis-80">
		<Card>
			<div class="space-y-8">
				<slot />
			</div>
		</Card>
	</div>
</Container>
