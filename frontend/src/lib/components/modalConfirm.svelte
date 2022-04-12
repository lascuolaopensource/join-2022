<script lang="ts">
	import { TextField, Form, SubmitButton } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { key } from './modal.svelte';
	import { getContext } from 'svelte';

	export let match: string;
	export let onSubmit: () => Promise<any> = async () => {
		console.log('submitting');
	};

	const { close } = getContext(key);

	const formContext = createForm({
		initialValues: {
			confirm: ''
		},
		onSubmit: async () => {
			await onSubmit();
			close();
		},
		validationSchema: yup.object({
			confirm: yup.string().required().oneOf([match])
		})
	});
</script>

<Form {formContext}>
	<TextField name="confirm" />
	<SubmitButton>
		<slot>Conferma!</slot>
	</SubmitButton>
</Form>
