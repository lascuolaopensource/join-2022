<script lang="ts">
	import { course } from '$lib/stores';

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { urlValidator } from '$lib/validators';

	import { Loading, Form, FormError, InputText, Button } from '$lib/components';

	//

	/**
	 * Costruiamo il form secondo le informazioni del corso
	 *
	 * Ma lo facciamo al contrario:
	 * 1. Creiamo il form con tutti i campi
	 * 2. Sottraiamo dal form i campi che non servono
	 *
	 * In questo modo si conserva il suggerimento dei tipi
	 */

	const initialValues = { letter: '', portfolio: '', cv: '' };
	const validationSchema = {
		letter: yup.string().required(),
		portfolio: urlValidator.required(),
		cv: urlValidator.required()
	};

	if (!$course.attributes.motivationalLetterNeeded) {
		delete initialValues.letter;
		delete validationSchema.letter;
	}

	if (!$course.attributes.portfolioNeeded) {
		delete initialValues.portfolio;
		delete validationSchema.portfolio;
	}

	if (!$course.attributes.cvNeeded) {
		delete initialValues.cv;
		delete validationSchema.cv;
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema: yup.object().shape(validationSchema),
		onSubmit: (values) => {
			console.log(values);
		}
	});
</script>

<!--  -->

<div class="container">
	<a class="backlink" href="/inside/corsi/{$course.attributes.slug}"
		>Torna al corso</a
	>
	<h2>{$course.attributes.title}</h2>
	<h1>Iscriviti!</h1>

	<Form on:submit={handleSubmit}>
		{#if $course.attributes.motivationalLetterNeeded}
			<InputText
				id="letter"
				label="Lettera motivazionale"
				error={$errors.letter}
				on:blur={handleChange}
				required
			/>
		{/if}
		{#if $course.attributes.cvNeeded}
			<InputText
				id="cv"
				label="Link al CV"
				error={$errors.cv}
				on:blur={handleChange}
				required
			/>
		{/if}
		{#if $course.attributes.portfolioNeeded}
			<InputText
				id="portfolio"
				label="Link al portfolio"
				error={$errors.portfolio}
				on:blur={handleChange}
				required
			/>
		{/if}
		<Button type="submit">Iscriviti al corso!</Button>
	</Form>
</div>

<!--  -->
<style>
	h1 {
		margin-bottom: var(--s-3);
	}
</style>
