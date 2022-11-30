<script lang="ts">
	import type { ActionData } from './$types';
	import paths from '$lib/constants/paths';
	import { routes as r } from 'join-shared';

	import { P } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';
	import { Form, Input } from '$lib/form';

	//

	export let form: ActionData;

	const { values: initialValues, schema: validationSchema } = r.Account.Password.Forgot;
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<!--  -->

<TitleAndLink title="Sign In" link={{ href: paths.login, text: '← Back to login' }} reverse />

<P>Please enter your email to recover your password.</P>

<Form {initialValues} {validationSchema} error={form?.error}>
	<Input label="Email" name="email" type="email" placeholder="maria@rossi.com" required />
</Form>
