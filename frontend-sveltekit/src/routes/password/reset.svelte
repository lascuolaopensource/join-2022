<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { post, endpoints } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { passwordValidator } from '$lib/validators';

	//

	import {
		OutsideTitle,
		Button,
		InputText,
		FormGroup,
		Form,
		FormError
	} from '$lib/components';

	import { icons } from '$lib/icons';

	//

	let errorMsg = '';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			password: '',
			passwordConfirm: ''
		},
		validationSchema: yup.object().shape({
			password: passwordValidator,
			passwordConfirm: passwordValidator.oneOf(
				[yup.ref('password'), null],
				'Passwords must match'
			)
		}),
		onSubmit: (values) => {
			errorMsg = '';
			resetPassword();
		}
	});

	async function resetPassword() {
		try {
			await post(fetch, endpoints.resetPassword, {
				code: $page.url.searchParams.get('code'),
				password: $form.password,
				passwordConfirmation: $form.passwordConfirm
			});
			// If response is ok we send the user to some confirmation
			goto('/password/resetconfirm');
		} catch (err) {
			errorMsg = err.message;
		}
	}
</script>

<!-- --- Markup --- -->

<a class="backlink" href="/">Login</a>

<OutsideTitle>Cambio password</OutsideTitle>

<Form on:submit={handleSubmit}>
	<FormError {errorMsg} />
	<FormGroup>
		<InputText
			id="password"
			type="password"
			label="Password"
			labelIcon={icons.fields.password}
			placeholder="Inserisci la nuova password"
			required
			tabindex={1}
			bind:value={$form.password}
			on:blur={handleChange}
			error={$errors.password}
		/>
		<InputText
			id="passwordConfirm"
			type="password"
			label="Password"
			labelIcon={icons.fields.password}
			placeholder="Conferma la nuova password"
			required
			tabindex={2}
			bind:value={$form.passwordConfirm}
			on:blur={handleChange}
			error={$errors.passwordConfirm}
		/>
	</FormGroup>
	<Button type="submit" tabindex={3}>Reset password</Button>
</Form>
