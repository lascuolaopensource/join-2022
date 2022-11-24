<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import paths from '$lib/constants/paths';
	import { Input, Label, Button, Alert } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<!--  -->

<TitleAndLink
	title="Register"
	link={{ href: paths.login, text: 'Already have an account? Login' }}
/>

<!-- <ListErrors errors={form?.errors} /> -->

<form use:enhance method="POST" class="space-y-8">
	<div class="space-y-6">
		<div>
			<Label for="firstName">First name</Label>
			<Input
				name="firstName"
				type="text"
				id="firstName"
				placeholder="Maria"
				required
				data-test="firstName"
			/>
		</div>
		<div>
			<Label for="lastName">Last name</Label>
			<Input
				name="lastName"
				type="text"
				id="lastName"
				placeholder="Rossi"
				required
				data-test="lastName"
			/>
		</div>
		<div>
			<Label for="email">Email</Label>
			<Input
				name="email"
				type="email"
				id="email"
				placeholder="maria@rossi.com"
				required
				data-test="email"
			/>
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input
				name="password"
				type="password"
				id="password"
				placeholder="********"
				required
				data-test="password"
			/>
		</div>
	</div>

	{#if form?.error}
		<Alert color="red" dismissable data-test="error">
			{form.error}
		</Alert>
	{/if}

	<Button type="submit" data-test="submit">Register</Button>
</form>
