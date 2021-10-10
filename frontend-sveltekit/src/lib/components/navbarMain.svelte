<!-- src/lib/Navbar.svelte -->
<script lang="ts">
	// Need this to check if user is logged
	import userStore from '$lib/stores/userStore';

	// Components
	import NavbarItem from './navbarItem.svelte';
	import LogoutButton from './logoutButton.svelte';
</script>

<nav class="">
	<!-- Main link -->
	<NavbarItem href="/inside">Join</NavbarItem>
	<!-- Right-side links -->
	{#if !$userStore}
		<div>
			<NavbarItem href="/register">Register</NavbarItem>
		</div>
	{:else}
		<div>
			<NavbarItem href="/inside/corsi">Corsi</NavbarItem>
		</div>
		<div>
			<NavbarItem href="/inside/profile">{$userStore.username}</NavbarItem>
			<LogoutButton>↖ Logout</LogoutButton>
		</div>
	{/if}
</nav>

<style>
	nav {
		background-color: var(--nav-main-bg);
		padding: var(--container-padding);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
</style>
