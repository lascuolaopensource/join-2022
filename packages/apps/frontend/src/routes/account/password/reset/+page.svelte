<script lang="ts">
	import type { ActionData } from './$types';
	import { routes as r } from 'join-shared';

	import { Form, Input } from '$lib/form';
	import { P } from 'flowbite-svelte';
	import { TitleAndLink } from '$lib/components';

	//

	export let form: ActionData;

	const { values: initialValues, schema: validationSchema } = r.Account.Password.Reset;
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<!--  -->

<TitleAndLink title="Change password" />

<P>Please enter your new password</P>

<Form {initialValues} {validationSchema} error={form?.error}>
	<Input name="password" type="password" placeholder="**********" />
	<Input name="passwordConfirmation" type="password" placeholder="**********" />
</Form>
