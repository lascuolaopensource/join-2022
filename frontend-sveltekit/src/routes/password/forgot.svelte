<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

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
	import { endpoints } from '$lib/requestUtils/endpoints';

	//

	let errorMsg = '';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required()
		}),
		onSubmit: (values) => {
			errorMsg = '';
			resetPassword();
		}
	});

	async function resetPassword() {
		try {
			// Sending the request to the server
			await post(fetch, endpoints.forgotPassword, {
				email: $form.email
			});
			// If response is ok we send the user to a confirmation message
			goto('/password/forgotconfirm');
		} catch (err) {
			errorMsg = err.message;
		}
	}
</script>

<!-- --- Markup --- -->

<a class="backlink" href="/">Login</a>

<OutsideTitle>Resetta la password</OutsideTitle>

<Form on:submit={handleSubmit}>
	<FormError {errorMsg} />
	<FormGroup>
		<InputText
			id="email"
			type="email"
			label="Email"
			labelIcon={icons.fields.email}
			placeholder="Inserisci la tua email"
			required
			tabindex={1}
			bind:value={$form.email}
			on:blur={handleChange}
			error={$errors.email}
		/>
	</FormGroup>
	<Button tabindex={2} type="submit">Recupera password</Button>
</Form>
