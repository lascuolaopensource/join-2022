<script lang="ts">
	import type { ActionData } from './$types';
	import paths from '$lib/constants/paths';
	import { routes as r } from 'join-shared';

	import { Input, Label } from 'flowbite-svelte';
	import { TextField } from '$lib/form';
	import { TitleAndLink } from '$lib/components';
	import { Form } from '$lib/form';
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
		<TextField label="First name" name="name" type="text" placeholder="Maria" required />
		<TextField label="Last name" name="surname" type="text" placeholder="Rossi" required />
		<TextField label="Email" name="email" type="email" placeholder="maria@rossi.com" required />
		<TextField
			label="Password"
			name="password"
			type="password"
			placeholder="********"
			required
		/>
	</div>
</Form>
