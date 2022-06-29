<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	export const navHgt = writable<number>(0);

	// Utility type
	export type MenuItem = {
		href: string;
		label: string;
	};
</script>

<script lang="ts">
	import { user, userInfo, userRole } from '$lib/stores';
	import { types as t } from 'shared';
	import { page } from '$app/stores';
	import { lsRemove, lsKeys } from '$lib/localStorageUtils';
	import { goto } from '$app/navigation';
	import _ from 'lodash';

	import { icons } from '$lib/icons';
	import { IconButton } from '$lib/components';
	import NavbarMenuLink from './navbarMenuLink.svelte';
	import NavbarDivider from './navbarDivider.svelte';

	//

	// List of pages
	const data: Record<string, MenuItem> = {
		home: { href: '/inside', label: 'Home' },
		courses: { href: '/inside/courses', label: 'Corsi' },
		adminEnrollments: {
			href: '/inside/admin/enrollments',
			label: 'Admin iscrizioni'
		},
		adminTools: { href: '/inside/admin/tools', label: 'Admin strumenti' },
		tools: { href: '/inside/tools', label: 'Strumenti' },
		profile: {
			href: '/inside/profile',
			label: $userInfo?.name ? $userInfo.name : 'User name'
		},
		logout: {
			href: '/logout',
			label: '↖ Logout'
		}
	};

	// Detecting current menu section
	let currentSection: MenuItem | undefined;
	$: currentSection = _.find(
		data,
		(value, key) => value.href == $page.url.pathname
	);

	// Opening and closing menu
	let open: boolean = false;
	function toggleMenu() {
		open = !open;
	}

	// Checking if user is admin
	const adminTools = $userRole == t.UserPermissionRoles.AdminTools;
	const adminEnrolls = $userRole == t.UserPermissionRoles.AdminEnrollments;
	const admin = adminEnrolls || adminTools;

	// Logout function
	function logout() {
		// We remove the token from localstorage
		lsRemove(lsKeys.token);
		// And the user from the store
		$user = null;
		// Then we redirect
		goto('/');
	}
</script>

<!-- Navbar -->

<nav
	class="
		bg-gray-900 px-4 py-2
		flex flex-row flex-nowrap items-center justify-between
		border-b-[1] 
		{open ? 'border-gray-500' : 'border-transparent'}
		z-[99]
	"
	bind:clientHeight={$navHgt}
>
	<!-- Title -->
	<h3 class="text-white font-bold">Join / SOS</h3>

	<!-- Right controls -->
	<div class="flex flex-row flex-nowrap items-center justify-end">
		{#if $user}
			<!-- Current section -->
			<p class="text-white mr-2">
				{#if currentSection}
					{currentSection.label}
				{/if}
			</p>

			<!-- Close / Open button -->
			<IconButton
				icon={open ? icons.close : icons.menu}
				on:click={toggleMenu}
				mode="dark"
			/>
		{:else}
			<!-- Invisible placeholder to keep height consistent -->
			<div class="h-8 invisible" />
		{/if}
	</div>
</nav>

<!-- Menu -->

{#if $user && open}
	<div
		class="menu w-full fixed bg-gray-800 p-4 z-[98]
			flex flex-col flex-nowrap space-y-2"
		style:--navHgt="{$navHgt}px"
	>
		<!-- Home -->
		<NavbarMenuLink href={data.home.href}>
			{data.home.label}
		</NavbarMenuLink>

		<NavbarDivider />

		<!-- Courses -->
		<NavbarMenuLink href={data.courses.href}
			>{data.courses.label}</NavbarMenuLink
		>

		<!-- Tools -->
		<NavbarMenuLink href={data.tools.href}>
			{data.tools.label}
		</NavbarMenuLink>

		<NavbarDivider />

		<!-- Admin enrollments -->
		{#if adminEnrolls}
			<NavbarMenuLink href={data.adminEnrollments.href}>
				{data.adminEnrollments.label}
			</NavbarMenuLink>
		{/if}
		<!-- Admin tools -->
		{#if adminTools}
			<NavbarMenuLink href={data.adminTools.href}>
				{data.adminTools.label}
			</NavbarMenuLink>
		{/if}
		<!-- Admin divider -->
		{#if admin}
			<NavbarDivider />
		{/if}

		<!-- Profile -->
		<NavbarMenuLink href={data.profile.href}>
			{data.profile.label}
		</NavbarMenuLink>

		<!-- Logout -->
		<NavbarMenuLink href={data.logout.href}>
			{data.logout.label}
		</NavbarMenuLink>
	</div>
{/if}

<!--  -->
<style>
	.menu {
		top: var(--navHgt);
		height: calc(100vh - var(--navHgt));
	}
</style>
