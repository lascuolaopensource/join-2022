<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { Navbar, NavBrand, Heading, Button, Modal } from 'flowbite-svelte';
	import { Container } from '$lib/components';
	import { RectangleStack, ArrowRightOnRectangle } from 'svelte-heros-v2';

	//
	let user = ($page.data as PageData).user;
</script>

<div class="w-screen min-h-screen flex flex-col bg-gray-200">
	<Navbar navClass="sticky top-0 w-full z-20 py-2 px-6">
		<NavBrand href="/">
			<Heading tag="h5">Join</Heading>
		</NavBrand>

		{#if user}
			<!-- Logout button -->
			<form
				action="/account/logout"
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						invalidateAll();
						await applyAction(result);
					};
				}}
			>
				<Button type="submit" color="light">
					<ArrowRightOnRectangle class="w-5 h-5" />
				</Button>
			</form>
		{:else}
			<div>
				<Button href="/account/login" color="light">Login</Button>
				<Button href="/account/register" color="light">Register</Button>
			</div>
		{/if}
	</Navbar>

	<main class="self-stretch grow flex flex-row items-stretch">
		<slot />
	</main>
</div>
