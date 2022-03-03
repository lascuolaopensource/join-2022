<script lang="ts">
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { createUserExistsTest, passwordValidator } from '$lib/validators';

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
		username: '',
		email: '',
		password: ''
	};

	const validationSchema = yup.object().shape({
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
	});

	async function onSubmit(values: typeof initialValues) {
		// This function registers a user
		try {
			// IMPORTANT! Since request is an async function, we need to put await before
			const res = await req.register(values);
			console.log(res);
			// If successful, we redirect
			goto('/register/thanks');
		} catch (e) {
			setFormError(e.message);
		}
	}

	const formContext = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});
</script>

<!-- ---  Markup --- -->

<a class="backlink" href="/">Login</a>

<OutsideTitle>Crea un account</OutsideTitle>

<Form {formContext}>
	<TextField
		name="username"
		type="text"
		labelText="Username"
		labelIcon={icons.fields.username}
		placeholder="Inserisci il tuo username"
	/>
	<TextField
		name="email"
		type="email"
		labelText="Email"
		labelIcon={icons.fields.email}
		placeholder="Inserisci la tua email"
	/>
	<TextField
		name="password"
		type="password"
		labelText="Password"
		labelIcon={icons.fields.password}
		placeholder="Inserisci la tua password"
		helperText="La password dev'essere compresa tra 8 e 52 caratteri"
	/>
	<FormError />
	<SubmitButton>Registrati!</SubmitButton>
</Form>
