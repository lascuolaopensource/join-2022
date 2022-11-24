<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	// import ListErrors from '$lib/ListErrors.svelte';
	import { Card, Input, Label, Button, Heading, P, A } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';
	import paths from '$lib/constants/paths';
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<!--  -->

<TitleAndLink title="Sign In" link={{ href: paths.register.index, text: 'Need an account?' }} />

<!-- <ListErrors errors={form?.errors} /> -->

<form
	use:enhance={() => {
		return async ({ result }) => {
			invalidateAll();
			await applyAction(result);
		};
	}}
	method="POST"
	class="space-y-8"
>
	<div class="space-y-6">
		<div>
			<Label for="email">Email</Label>
			<Input
				name="email"
				type="email"
				id="email"
				placeholder="mario@rossi.com"
				required
				data-test="email"
			/>
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input name="password" type="password" id="password" required data-test="password" />
		</div>
	</div>

	<Button type="submit" data-test="submit">Sign in</Button>
</form>
