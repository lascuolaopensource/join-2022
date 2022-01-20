<script lang="ts">
	import { goto } from '$app/navigation';

	import { lsKeys, lsSet } from '$lib/localStorageUtils';
	import { post, endpoints } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	//

	import OutsideTitle from '$lib/components/outsideTitle.svelte';
	import Button from '$lib/components/button.svelte';
	import InputText from '$lib/components/inputText.svelte';
	import FormGroup from '$lib/components/formGroup.svelte';
	import Form from '$lib/components/form.svelte';
	import FormError from '$lib/components/formError.svelte';

	import { icons } from '$lib/icons';

	//

	// Error message for the result of the form
	let errorMsg = '';

	// Creating form
	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required()
		}),
		onSubmit: (values) => {
			errorMsg = '';
			checkEmail();
		}
	});

	//

	async function checkEmail() {
		try {
			const data = await post(fetch, endpoints.checkLoginEmail, {
				email: $form.email
			});
			// We store email and username in localstorage
			lsSet(lsKeys.email, data.email);
			lsSet(lsKeys.username, data.username);
			// And redirect the user to the password
			goto('/login/password');
		} catch (err) {
			if (err.message == '404') {
				errorMsg = "L'email non è corretta";
			} else {
				errorMsg = err.message;
			}
		}
	}
</script>

<!-- --- Markup --- -->

<OutsideTitle>Login</OutsideTitle>

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
	<Button type="submit" tabindex={2}>Avanti</Button>
</Form>

<!-- Registration link -->
<div class="message">
	<p>Non hai un account?</p>
	<a href="/register" class="registrati">Registrati!</a>
</div>

<!-- --- Style --- -->
<style>
	.message {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin-top: var(--s-4);
	}

	.registrati {
		margin-left: var(--s-0);
	}
</style>
