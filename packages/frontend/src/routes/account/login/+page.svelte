<script lang="ts">
	import { routes as r } from 'join-shared';
	import type { ActionData } from './$types';
	import paths from '$lib/constants/paths';

	import { TitleAndLink } from '$lib/components';
	import { Form, Input } from '$lib/form';
	import type { AnchorProp } from '$lib/components/types';

	//

	export let form: ActionData;

	const { values: initialValues, schema: validationSchema } = r.Account.Login;

	const passwordLink: AnchorProp = {
		href: paths.password.forgot.index,
		text: 'Forgot your password?'
	};
	const titleLink: AnchorProp = { href: paths.register.index, text: 'Need an account?' };
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<!--  -->

<TitleAndLink title="Sign In" link={titleLink} />

<Form {initialValues} {validationSchema} error={form?.error}>
	<Input name="identifier" label="Email" placeholder="maria@rossi.com" type="email" required />
	<Input
		name="password"
		label="Password"
		placeholder="*********"
		type="password"
		required
		link={passwordLink}
	/>
</Form>
