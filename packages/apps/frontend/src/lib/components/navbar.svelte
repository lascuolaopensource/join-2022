<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import paths from '$lib/constants/paths';

	import { Navbar, NavBrand, Heading, Button } from 'flowbite-svelte';
	import { ArrowRightOnRectangle } from 'svelte-heros-v2';

	export let user: App.Locals['user'];
</script>

<!--  -->

<Navbar navClass="sticky top-0 z-20 ">
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
	</div>
</Navbar>
