<!-- src/lib/Navbar.svelte -->
<script lang="ts">
	// Need this to get user name
	import userStore from '$lib/stores/userStore';

	// Components
	import NavbarItem from './navbarItem.svelte';
	import LogoutButton from './logoutButton.svelte';
</script>

<nav>
	<!-- Main link -->
	<NavbarItem href="/inside">Join</NavbarItem>
	<!-- Right-side links -->
	<div>
		<NavbarItem href="/inside/corsi">Corsi</NavbarItem>
	</div>
	<div>
		<NavbarItem href="/inside/profile">{$userStore.username}</NavbarItem>
		<LogoutButton>↖ Logout</LogoutButton>
	</div>
</nav>

<style>
	div {
		height: fit-content;
		width: fit-content;
	}

	nav {
		background-color: var(--nav-main-bg);
		padding: var(--container-padding);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
	}
</style>
