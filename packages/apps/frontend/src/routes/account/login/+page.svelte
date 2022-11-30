<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	// import ListErrors from '$lib/ListErrors.svelte';
	import { Card, Input, Label, Button, Heading, P, A } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';
	import { Form } from '$lib/form';
	import paths from '$lib/constants/paths';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<!--  -->

<TitleAndLink title="Sign In" link={{ href: paths.register.index, text: 'Need an account?' }} />

<Form error={form?.error}>
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
				tabindex="1"
			/>
		</div>
		<div>
			<div class="flex justify-between">
				<Label for="password">Password</Label>
				<Label>
					<A href={paths.password.forgot.index} data-test="forgot-password" tabindex="4"
						>Forgot password?</A
					>
				</Label>
			</div>
			<Input
				name="password"
				type="password"
				id="password"
				required
				data-test="password"
				tabindex="2"
				placeholder="********"
			/>
		</div>
	</div>
</Form>
