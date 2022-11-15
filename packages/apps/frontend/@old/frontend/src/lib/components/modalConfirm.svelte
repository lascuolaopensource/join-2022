<script lang="ts">
	import { TextField, Form, SubmitButton } from './form';
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	export let match: string;

	const dispatch = createEventDispatcher();
	function confirmed() {
		dispatch('confirmed');
	}

	const formContext = createForm({
		initialValues: {
			confirm: ''
		},
		onSubmit: confirmed,
		validationSchema: yup.object({
			confirm: yup.string().required().oneOf([match])
		})
	});
</script>

<!--  -->

<Form {formContext}>
	<TextField name="confirm" />
	<SubmitButton>
		<slot>Conferma!</slot>
	</SubmitButton>
</Form>
