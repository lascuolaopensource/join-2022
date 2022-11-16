<script lang="ts">
	import '../app.css';

	import { Navbar, NavBrand, Heading, Button, Modal } from 'flowbite-svelte';
	import { Container } from '$lib/components';
	import { RectangleStack } from 'svelte-heros-v2';

	let defaultModal = false;
</script>

<div class="w-screen min-h-screen bg-gray-200">
	<Navbar>
		<NavBrand href="/">
			<Heading tag="h5">Join</Heading>
		</NavBrand>
	</Navbar>
	<Container>
		<slot />
	</Container>
</div>
