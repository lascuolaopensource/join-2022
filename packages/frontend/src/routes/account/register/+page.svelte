<script lang="ts">
	import type { ActionData } from './$types';
	import paths from '$lib/constants/paths';
	import { routes as r } from 'join-shared';

	import { Input } from '$lib/form';
	import { TitleAndLink } from '$lib/components';
	import { Form } from '$lib/form';
	//

	export let form: ActionData;

	const { values: initialValues, schema: validationSchema } = r.Account.Register;
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<!--  -->

<TitleAndLink
	title="Register"
	link={{ href: paths.login, text: 'Already have an account? Login' }}
/>

<Form {initialValues} {validationSchema} error={form?.error}>
	<Input label="First name" name="name" type="text" placeholder="Maria" required />
	<Input label="Last name" name="surname" type="text" placeholder="Rossi" required />
	<Input label="Email" name="email" type="email" placeholder="maria@rossi.com" required />
	<Input label="Password" name="password" type="password" placeholder="********" required />
</Form>
