<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import Navbar from '$lib/components/navbar.svelte';

	//
	let user: App.Locals['user'];
	$: user = ($page.data as PageData).user;
</script>

<div class="w-screen min-h-screen flex flex-col bg-gray-200">
	<Navbar {user} />

	<main class="self-stretch grow flex flex-row items-stretch">
		<slot />
	</main>
</div>
