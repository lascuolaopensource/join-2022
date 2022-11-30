<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { createForm } from 'svelte-forms-lib';
	import paths from '$lib/constants/paths';
	import { routes as r } from 'join-shared';

	import { Input, Label, Button, Alert } from 'flowbite-svelte';
	import { TitleAndLink, FormError } from '$lib/components';
	import { Form } from '$lib/components/form';
	//

	export let form: ActionData;

	const formContext = createForm({
		initialValues: r.Account.Register.values,
		validationSchema: r.Account.Register.schema,
		onSubmit: () => {}
	});

	const {
		form: libForm,
		state,
		errors,
		touched,
		isSubmitting,
		isValid,
		handleChange,
		handleSubmit
	} = formContext;
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

<Form>
	<div class="space-y-6">
		<div>
			<Label for="name">First name</Label>
			<Input
				name="name"
				type="text"
				id="name"
				placeholder="Maria"
				required
				data-test="name"
				value={$libForm.name}
				on:change={handleChange}
				on:blur={handleChange}
			/>
		</div>
		<div>
			<Label for="surname">Last name</Label>
			<Input
				name="surname"
				type="text"
				id="surname"
				placeholder="Rossi"
				required
				data-test="surname"
				value={$libForm.surname}
				on:change={handleChange}
				on:blur={handleChange}
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
				value={$libForm.email}
				on:change={handleChange}
				on:blur={handleChange}
			/>
			<p>{$errors.email}</p>
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
				value={$libForm.password}
				on:change={handleChange}
				on:blur={handleChange}
			/>
		</div>
	</div>

	<FormError error={form?.error} />

	<Button type="submit" data-test="submit">Register</Button>
</Form>
