<script lang="ts">
	import { goto } from '$app/navigation';

	import { post, endpoints } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { createUserExistsTest, passwordValidator } from '$lib/validators';

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

	// Error message for the result of the form
	let errorMsg = '';

	// Creating form
	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			username: '',
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			username: yup
				.string()
				.required()
				.test({
					name: 'usernameExists',
					message: "L'username esiste già",
					test: createUserExistsTest('username')
				}),
			email: yup
				.string()
				.email()
				.required()
				.test({
					name: 'emailExists',
					message: "L'email esiste già",
					test: createUserExistsTest('email')
				}),
			password: passwordValidator
		}),
		onSubmit: () => {
			errorMsg = '';
			registerUser();
		}
	});

	//

	// Registers a user
	async function registerUser() {
		try {
			// IMPORTANT! Since post is an async function, we need to put await before
			await post(fetch, endpoints.register, {
				username: $form.username,
				email: $form.email,
				password: $form.password
			});
			// If successful, we redirect
			goto('/register/thanks');
		} catch (err) {
			errorMsg = err.message;
		}
	}
</script>

<!-- ---  Markup --- -->

<a class="backlink" href="/">Login</a>

<OutsideTitle>Crea un account</OutsideTitle>

<Form on:submit={handleSubmit}>
	<FormError {errorMsg} />
	<FormGroup>
		<InputText
			id="username"
			type="text"
			label="Username"
			labelIcon={icons.fields.username}
			placeholder="Inserisci il tuo username"
			required
			tabindex={1}
			bind:value={$form.username}
			on:blur={handleChange}
			error={$errors.username}
		/>
		<InputText
			id="email"
			type="email"
			label="Email"
			labelIcon={icons.fields.email}
			placeholder="Inserisci la tua email"
			required
			tabindex={2}
			bind:value={$form.email}
			on:blur={handleChange}
			error={$errors.email}
		/>
		<InputText
			id="password"
			type="password"
			label="Password"
			labelIcon={icons.fields.password}
			placeholder="Inserisci la tua password"
			required
			tabindex={3}
			bind:value={$form.password}
			on:blur={handleChange}
			error={$errors.password}
			helperText="La password dev'essere compresa tra 8 e 52 caratteri"
		/>
	</FormGroup>
	<Button tabindex={4} type="submit">Registrati!</Button>
</Form>
