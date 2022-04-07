<script context="module" lang="ts">
	export const key = 'navKey';
</script>

<script lang="ts">
	import { userInfo, userRole } from '$lib/stores';
	import { setContext } from 'svelte';
	import { types as t } from 'shared';

	import { icons } from '$lib/icons';
	import { MenuItem, LogoutButton } from '$lib/components';

	//

	type MenuSection = {
		href: string;
		label: string;
	};

	const data: Record<string, MenuSection> = {
		home: { href: '/inside', label: 'Home' },
		courses: { href: '/inside/courses', label: 'Corsi' },
		admin: { href: '/inside/admin', label: 'Admin' },
		profile: { href: '/inside/profile', label: $userInfo.name }
	};

	let currentSection = data.home;
	let navHgt: number;
	let open: boolean = false;

	//

	setContext(key, {
		updateSection: (section: MenuSection) => {
			currentSection = section;
			open = false;
		}
	});
</script>

<nav bind:clientHeight={navHgt}>
	<div class="nav__title">Join / SOS</div>
	<button
		class="nav__btn"
		on:click|preventDefault={() => {
			open = !open;
		}}
	>
		<div class="nav__btn__text">
			{currentSection.label}
		</div>
		<div class="nav__btn__arrow">
			{#if open}
				<svelte:component this={icons.arrows.up} />
			{:else}
				<svelte:component this={icons.arrows.down} />
			{/if}
		</div>
	</button>
</nav>

{#if open}
	<div class="menu space-between" style:--h="{navHgt}px">
		<MenuItem data={data.home} />
		<MenuItem data={data.courses} />
		{#if $userRole == t.UserPermissionRoles.AdminEnrollments}
			<MenuItem data={data.admin} />
		{/if}
		<MenuItem data={data.profile} />
		<LogoutButton>↖ Logout</LogoutButton>
	</div>
{/if}

<style>
	nav {
		background-color: var(--nav-main-bg);
		padding: var(--s-1) var(--s-3);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 99;
	}

	.nav__title {
		color: white;
		font-size: 20px;
	}

	.nav__btn {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		border-radius: var(--border-radius);
		border: none;
		text-decoration: none;
		background-color: var(--nav-main-item-bg);
		color: white;
	}

	.nav__btn__arrow {
		padding: calc(var(--item-padding) / 2);
		background-color: var(--nav-main-item-bg);
		display: flex;
		flex-flow: row nowrap;
	}

	.nav__btn__text {
		padding: calc(var(--item-padding) / 2) var(--item-padding);
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		color: white;
	}

	.menu {
		position: fixed;
		height: calc(100vh - var(--h));
		width: 100%;
		top: var(--h);
		left: 0;
		background-color: black;
		padding: var(--s-3);
		border-top: 1px solid white;
		display: flex;
		flex-flow: column nowrap;
	}
</style>
