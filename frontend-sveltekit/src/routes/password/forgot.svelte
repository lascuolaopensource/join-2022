<script lang="ts">
	import { goto } from '$app/navigation';
	import post from '$lib/requestUtils/post';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import OutsideBacklink from '$lib/components/outsideBacklink.svelte';
	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	import { icons } from '$lib/icons';
	import { endpoints } from '$lib/requestUtils/endpoints';

	//

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

	//

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

	//

	let errorMsg = '';
</script>

<!-- --- Markup --- -->

<OutsideBacklink href="/" label="Login" />

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
