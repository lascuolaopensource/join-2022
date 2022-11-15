<script lang="ts" context="module">
	export const formKey = 'formKey';
</script>

<script lang="ts">
	import { setContext, onDestroy, onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { clearFormError } from './formError.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	// import { writable } from 'svelte/store';

	//

	export let lsKey: string = 'form';
	// Questa variabile serve per salvare il form nel localstorage
	// Quindi deve essere unica per ogni form

	export let initialValues = {};
	export let validate = undefined;
	export let validationSchema = undefined;
	export let onSubmit = () => {
		throw new Error(
			'onSubmit is a required property in <Form /> when using the fallback context'
		);
	};

	// Creating form
	// (We also export it in case one wants to pass a created form)
	export let formContext = createForm<any>({
		initialValues,
		onSubmit,
		validate,
		validationSchema
	});

	// Getting form props
	const {
		form,
		errors,
		touched,
		state,
		handleChange,
		handleSubmit,
		updateField,
		updateInitialValues,
		updateTouched,
		updateValidateField,
		validateField,
		isValid,
		isSubmitting
	} = formContext;

	/**
	 * Setting context
	 */

	setContext(formKey, {
		form,
		errors,
		touched,
		state,
		handleChange,
		handleSubmit,
		updateField,
		updateInitialValues,
		updateTouched,
		updateValidateField,
		validateField,
		isValid,
		isSubmitting
	});

	/**
	 * LocalStorage management
	 */

	// SET: Saving in localstorage when editing
	$: if ($state.isModified) {
		localStorage.setItem(lsKey, JSON.stringify($form));
	}

	// GET: On mount, we check if there's
	onMount(() => {
		const formLSData = localStorage.getItem(lsKey);
		if (formLSData) {
			$form = JSON.parse(formLSData);
		}
	});

	// DEL: This function clears localstorage on component destroy
	function clearStorage() {
		localStorage.removeItem(lsKey);
	}

	/**
	 * Error management
	 */

	// Quando si effettua il submit, bisogna eliminare l'errore
	// Lato utente è più chiaro
	function handleSubmitClearErr(e: Event) {
		clearFormError();
		handleSubmit(e);
	}

	/**
	 * Handle form destruction
	 */

	// We clear the error and the localstorage
	onDestroy(() => {
		clearStorage();
		clearFormError();
	});

	//

	// // $isValid doesn't seem to work when the form is empty
	// // Questo store serve per attivare il bottone di submit quando:
	// // - tutti i campi sono stati compilati
	// // - il form è valido
	// const isFilledAndValid = writable<boolean>(false);
	// $: $isFilledAndValid = Object.values($touched).every((e) => e) && $isValid;

	//

	// This function is needed to remove error on:input
	// function clearError(e: Event) {
	// 	const target = e.target as HTMLInputElement;
	// 	$errors[target.name] = '';
	// }

	//

	// // Questo serve per eseguire la validazione dopo un po' di tempo:
	// // https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript

	// // Questo store conserva il timeout attivo
	// const timeout = writable<any>(null);

	// // Questa funzione viene eseguita sul 'keyup' o simili
	// function handleChangeWait(e) {
	// 	// Clear the timeout if it has already been set.
	// 	// This will prevent the previous task from executing
	// 	// if it has been less than <MILLISECONDS>
	// 	clearTimeout($timeout);

	// 	// Make a new timeout set to go off in 1000ms (1 second)
	// 	$timeout = setTimeout(function () {
	// 		handleChange(e);
	// 		$timeout = null;
	// 	}, 1000);
	// }
</script>

<!--  -->

<form class="space-y-6" on:submit={handleSubmitClearErr}>
	<slot />
</form>

<!-- Loading spinner -->
{#if $isSubmitting}
	<div
		class="
			w-screen h-screen bg-white/80
			flex flex-row flex-nowrap items-center justify-center
			fixed top-0 left-0 z-[9000]	
		"
	>
		<Spinner />
	</div>
{/if}
