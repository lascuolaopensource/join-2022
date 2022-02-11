<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { post, endpoints } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { passwordValidator } from '$lib/validators';

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

	const initialValues = {
		password: '',
		passwordConfirm: ''
	};

	const validationSchema = yup.object().shape({
		password: passwordValidator,
		passwordConfirm: passwordValidator.oneOf(
			[yup.ref('password'), null],
			'Passwords must match'
		)
	});

	async function onSubmit(values: typeof initialValues) {
		try {
			await post(fetch, endpoints.resetPassword, {
				code: $page.url.searchParams.get('code'),
				password: values.password,
				passwordConfirmation: values.passwordConfirm
			});
			// If response is ok we send the user to some confirmation
			goto('/password/resetconfirm');
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
		name="passwordConfirm"
		type="password"
		labelText="Conferma password"
		labelIcon={icons.fields.password}
		placeholder="Conferma la nuova password"
	/>
	<FormError />
	<SubmitButton>Reset password</SubmitButton>
</Form>
