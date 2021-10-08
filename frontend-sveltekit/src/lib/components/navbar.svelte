<!-- src/lib/Navbar.svelte -->
<script lang="ts">
	import userStore from '$lib/stores/userStore';
	import { goto } from '$app/navigation';

	// Components
	import NavbarItem from './navbarItem.svelte';
	import Button from './button.svelte';

	async function logout() {
		localStorage.removeItem('token');
		$userStore = null;
		goto('/');
	}
</script>

<nav class="">
	<!-- Main link -->
	<NavbarItem href="/">Join</NavbarItem>
	<!-- Right-side links -->
	{#if !$userStore}
		<div>
			<NavbarItem href="/login">Login</NavbarItem>
			<NavbarItem href="/register">Register</NavbarItem>
		</div>
	{:else}
		<div>
			<NavbarItem href="/inside/corsi">Corsi</NavbarItem>
		</div>
		<div>
			<NavbarItem href="/inside/profile">{$userStore.username}</NavbarItem>
			<Button hierarchy="Tertiary" on:click={logout}>Logout</Button>
		</div>
	{/if}
</nav>

<style>
	nav {
		padding: var(--padding-container);
		border-bottom: 1px solid black;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
</style>
