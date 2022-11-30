<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import paths from '$lib/constants/paths';

	import { Navbar, NavBrand, Heading, Button } from 'flowbite-svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';

	export let user: App.Locals['user'];
</script>

<!--  -->

<Navbar navClass="sticky top-0 z-20 border-b-1 border-b-gray-300">
	<div class="px-6 py-2 flex flex-row justify-between items-center grow">
		<NavBrand href="/">
			<Heading tag="h5">Join</Heading>
		</NavBrand>

		{#if user}
			<!-- Logout button -->
			<form
				action={paths.logout}
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						invalidateAll();
						await applyAction(result);
					};
				}}
			>
				<Button type="submit" color="light" data-test="nav-btn-logout">
					<Logout size={20} />
				</Button>
			</form>
		{:else}
			<div>
				<Button href="/account/login" color="light" data-test="nav-btn-login">Login</Button>
				<Button href="/account/register" color="light" data-test="nav-btn-register"
					>Register</Button
				>
			</div>
		{/if}
	</div>
</Navbar>
