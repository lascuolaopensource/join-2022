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

<TitleAndLink title="Change password" />

<P>Please enter your new password</P>

<form use:enhance method="POST" class="space-y-8">
	<div class="space-y-6">
		<div>
			<Label for="password">Password</Label>
			<Input
				name="password"
				type="password"
				id="password"
				placeholder="**********"
				required
				data-test="password"
			/>
		</div>
		<div>
			<Label for="passwordConfirmation">Repeat password</Label>
			<Input
				name="passwordConfirmation"
				type="password"
				id="passwordConfirmation"
				placeholder="**********"
				required
				data-test="passwordConfirmation"
			/>
		</div>
	</div>

	<FormError error={form?.error} />

	<Button type="submit" data-test="submit">Sign in</Button>
</form>
