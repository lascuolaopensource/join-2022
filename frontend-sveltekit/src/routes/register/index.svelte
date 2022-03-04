<script lang="ts">
	import { goto } from '$app/navigation';

	import { req } from '$lib/requestUtils';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { createUserExistsTest, passwordValidator } from '$lib/validators';
	import type { f } from 'shared';

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

	const initialValues: f.register.reType = {
		name: '',
		surname: '',
		email: '',
		password: ''
	};

	const validationSchema = yup.object().shape({
		name: yup.string().required(),
		surname: yup.string().required(),
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

	async function onSubmit(values: f.register.reType) {
		// This function registers a user
		try {
			// Creating user
			const res = await req.register(values);
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
		name="name"
		type="text"
		labelText="Nome"
		labelIcon={icons.fields.username}
		placeholder="Inserisci il tuo nome"
	/>
	<TextField
		name="surname"
		type="text"
		labelText="Cognome"
		labelIcon={icons.fields.username}
		placeholder="Inserisci il tuo cognome"
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
