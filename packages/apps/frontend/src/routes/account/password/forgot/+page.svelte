<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ActionData } from './$types';
	// import ListErrors from '$lib/ListErrors.svelte';
	import { Input, Label, Button, P } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';
	import paths from '$lib/constants/paths';
	import FormError from '$lib/components/form/FormError.svelte';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<!--  -->

<TitleAndLink title="Sign In" link={{ href: paths.login, text: '← Back to login' }} reverse />

<P>Please enter your email to recover your password.</P>

<form use:enhance method="POST" class="space-y-8">
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
	</div>

	<FormError error={form?.error} />

	<Button type="submit" data-test="submit">Sign in</Button>
</form>
