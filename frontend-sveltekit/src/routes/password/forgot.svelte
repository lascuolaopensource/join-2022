<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/helpers/requestUtils';

	import OutsideBacklink from '$lib/components/outsideBacklink.svelte';
	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { createExistsTest } from '$lib/validationTests';

	import { icons } from '$lib/icons';

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email()
				.required()
				.test({
					name: 'emailExists',
					message: "L'email non esiste",
					test: createExistsTest('email')
				})
		}),
		onSubmit: (values) => {
			resetPassword();
		}
	});

	// Registers a user
	async function resetPassword() {
		try {
			// Sending the request to the server
			await post(fetch, 'http://localhost:1337/auth/forgot-password', {
				email: $form.email
			});
			// If response is ok we send the user to some confirmation
			goto('/password/forgotconfirm');
		} catch (err) {
			alert(err.message);
		}
	}
</script>

<!-- Markup -->

<OutsideBacklink href="/" label="Login" />

<OutsideTitle>Resetta la password</OutsideTitle>

<Form on:submit={handleSubmit}>
	<!-- Rest of the form -->
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
