<script lang="ts">
	import type { ActionData } from './$types';
	import paths from '$lib/constants/paths';
	import { routes as r } from 'join-shared';

	import { Input, Label, Button } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';
	import { Form } from '$lib/components/form';
	//

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

<Form
	error={form?.error}
	initialValues={r.Account.Register.values}
	validationSchema={r.Account.Register.schema}
>
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

	<svelte:fragment slot="buttons">
		<Button type="submit" data-test="submit">Register</Button>
	</svelte:fragment>
</Form>
