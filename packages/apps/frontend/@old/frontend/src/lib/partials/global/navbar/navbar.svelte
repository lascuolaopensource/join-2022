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
	import _ from 'lodash';
	import { isOpen } from '$lib/utils';

	import { icons } from '$lib/icons';
	import { IconButton, NavLink, Hr } from '$lib/components';

	import { afterNavigate } from '$app/navigation';

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
	$: currentSection = _.find(data, (value, key) =>
		isOpen(value.href, $page.url)
	);

	// Opening and closing menu
	let open: boolean = false;
	function toggleMenu() {
		open = !open;
	}

	// Closing after navigation
	afterNavigate(() => {
		open = false;
	});

	// Checking if user is admin
	const adminTools = $userRole == t.UserPermissionRoles.AdminTools;
	const adminEnrolls = $userRole == t.UserPermissionRoles.AdminEnrollments;
	const admin = adminEnrolls || adminTools;
</script>

<!-- Navbar -->

<nav
	class="
		bg-gray-900 
		border-b-[1] 
		{open ? 'border-gray-500' : 'border-transparent'}
		z-[99] sticky top-0
	"
	bind:clientHeight={$navHgt}
>
	<!-- Container -->
	<div
		class="
			container mx-auto px-4 py-2
			flex flex-row flex-nowrap items-center justify-between
		"
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
	</div>
</nav>

<!-- Menu -->

{#if $user && open}
	<div
		class="menu w-full fixed bg-gray-800 z-[98]"
		style:--navHgt="{$navHgt}px"
	>
		<div
			class="
				container mx-auto w-full
				flex flex-col flex-nowrap space-y-2 p-4
			"
		>
			<!-- Home -->
			<NavLink href={data.home.href}>
				{data.home.label}
			</NavLink>

			<Hr />

			<!-- Courses -->
			<NavLink href={data.courses.href}>{data.courses.label}</NavLink>

			<!-- Tools -->
			<NavLink href={data.tools.href}>
				{data.tools.label}
			</NavLink>

			<Hr />

			<!-- Admin enrollments -->
			{#if adminEnrolls}
				<NavLink href={data.adminEnrollments.href}>
					{data.adminEnrollments.label}
				</NavLink>
			{/if}
			<!-- Admin tools -->
			{#if adminTools}
				<NavLink href={data.adminTools.href}>
					{data.adminTools.label}
				</NavLink>
			{/if}
			<!-- Admin divider -->
			{#if admin}
				<Hr />
			{/if}

			<!-- Profile -->
			<NavLink href={data.profile.href}>
				{data.profile.label}
			</NavLink>

			<!-- Logout -->
			<NavLink href={data.logout.href}>
				{data.logout.label}
			</NavLink>
		</div>
	</div>
{/if}

<!--  -->
<style>
	.menu {
		top: var(--navHgt);
		height: calc(100vh - var(--navHgt));
	}
</style>
