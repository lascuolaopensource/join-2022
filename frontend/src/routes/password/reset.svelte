<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { validation as v } from 'shared';
	import { passwordSchema } from '$lib/validators';

	//

	import { OutsideTitle } from '$lib/components';

	import {
		Form,
		TextField,
		SubmitButton,
		FormError,
		setFormError
	} from '$lib/components/form';

	import { icons } from '$lib/icons';

	//

	v.setYupDefaultMessages();

	const initialValues = {
		code: $page.url.searchParams.get('code'),
		password: '',
		passwordConfirmation: ''
	};

	const validationSchema = yup.object().shape({
		code: yup.string().required(),
		password: passwordSchema,
		passwordConfirmation: passwordSchema.oneOf(
			[yup.ref('password'), null],
			'Passwords must match'
		)
	});

	async function onSubmit(values: typeof initialValues) {
		try {
			await req.resetPassword(values);
			// If response is ok we send the user to some confirmation
			await goto('/password/resetconfirm');
		} catch (err) {
			setFormError(err.message);
		}
	}

	const formContext = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});
</script>

<!-- --- Markup --- -->

<a class="backlink" href="/">Login</a>

<OutsideTitle>Cambio password</OutsideTitle>

<Form {formContext}>
	<TextField
		name="password"
		type="password"
		labelText="Password"
		labelIcon={icons.fields.password}
		placeholder="Inserisci la nuova password"
	/>
	<TextField
		name="passwordConfirmation"
		type="password"
		labelText="Conferma password"
		labelIcon={icons.fields.password}
		placeholder="Conferma la nuova password"
	/>
	<FormError />
	<SubmitButton>Reset password</SubmitButton>
</Form>
