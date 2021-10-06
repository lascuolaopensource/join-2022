<!-- src/lib/Navbar.svelte -->
<script lang="ts">
	import userStore from '$lib/stores/userStore';
	import { goto } from '$app/navigation';

	async function logout() {
		localStorage.removeItem('token');
		$userStore = null;
		goto('/');
	}
</script>

<nav class="">
	<!-- Main link -->
	<a href="/">Join</a>
	<!-- Right-side links -->
	{#if !$userStore}
		<div>
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		</div>
	{:else}
		<div>
			<a href="/inside/corsi">Corsi</a>
		</div>
		<div>
			<a href="/inside/profile">{$userStore.username}</a>
			<button on:click={logout}>Logout</button>
		</div>
	{/if}
</nav>

<style>
	nav {
		padding: 10px;
		border-bottom: 1px solid black;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
</style>
