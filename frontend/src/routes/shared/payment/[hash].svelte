<script lang="ts" context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		try {
			const paymentDetails = await req.getPaymentDetails(params.hash);

			// Redirecting if already confirmed
			if (paymentDetails.paid) {
				return {
					status: 302,
					redirect: `/shared/payment/alreadyConfirmed`
				};
			}

			// Redirecting if expired
			if (paymentDetails.expired) {
				return {
					status: 302,
					redirect: `/shared/payment/expired`
				};
			}

			//
			return {
				props: {
					paymentDetails
				}
			};
		} catch (e) {
			return {
				status: 302,
				redirect: `/shared/payment/notExisting`
			};
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { req } from '$lib/requestUtils';
	import { setFormError } from '$lib/components/form';
	import { types as t, endpoints as e, formatters as f } from 'shared';
	import { lsKeys } from '$lib/localStorageUtils';
	import { s, placeholders as p } from '$lib/strings';

	import { createForm } from 'svelte-forms-lib';
	import {
		Form,
		TextField,
		RadioField,
		SubmitButton,
		FormError
	} from '$lib/components/form';

	import { Callout } from '$lib/components';

	//

	export let paymentDetails: e.PayGetPaymentDetailsRes;

	/**
	 * Form setup
	 */

	async function onSubmit(values: e.PayReq) {
		try {
			// Invio richiesta
			const res = await req.pay($page.params.hash, values);

			// Si va al pagamento se la risposta è positiva
			if (res.sessionUrl) {
				await goto(res.sessionUrl);
			} else {
				throw new Error(
					'Could not create payment session, please try again later or contact admin if error persists'
				);
			}
		} catch (e) {
			setFormError(e);
		}
	}

	// Setting billing options
	const billingOptions = t.BillingOptions;
	const radioValues = [
		{ value: billingOptions[0], label: 'Io' },
		{ value: billingOptions[1], label: 'Qualcun altro per me' },
		{ value: billingOptions[2], label: 'Attività commerciale' }
	];

	// Creating form
	const formContext = createForm({
		initialValues: e.PayValues,
		validationSchema: e.PaySchema,
		onSubmit
	});
	const { form } = formContext;
</script>

<!--  -->

<h1>Pagamento</h1>

<Callout>
	{s.pay.callout}
</Callout>

<table>
	<tr>
		<th>Destinatario</th>
		<td>{paymentDetails.owner}</td>
	</tr>
	<tr>
		<th>Oggetto</th>
		<td>{paymentDetails.category} – {paymentDetails.title}</td>
	</tr>
	<tr>
		<th>Prezzo</th>
		<td>
			{f.formatPriceNumber(paymentDetails.price)}
		</td>
	</tr>
	<tr>
		<th>Scadenza pagamento</th>
		<td>
			{f.formatDateString(paymentDetails.expiration)}
		</td>
	</tr>
</table>

<div class="notes">
	<h2>{s.pay.info}</h2>
	<ul>
		<li>{s.pay.dataAgain}</li>
		<li>{s.pay.link}</li>
	</ul>
</div>

<Form {formContext} lsKey={lsKeys.paymentForm}>
	<hr />

	<!--  -->

	<h2>Dati di fatturazione</h2>

	<RadioField name="billingOption" items={radioValues} labelText="Chi paga?" />

	{#if $form.billingOption}
		<hr />

		{#if $form.billingOption == billingOptions[0]}
			<!-- Io -->
			<TextField name="me.cf" labelText="Codice fiscale" type="text" />
		{:else if $form.billingOption == billingOptions[1]}
			<!-- Persona fisica -->
			<TextField name="person.name" labelText="Nome" type="text" />
			<TextField name="person.surname" labelText="Cognome" type="text" />
			<TextField name="person.cf" labelText="Codice fiscale" type="text" />
			<TextField name="person.email" labelText="Email" type="email" />
		{:else if $form.billingOption == billingOptions[2]}
			<!-- Azienda -->
			<TextField name="company.name" labelText="Nome società" type="text" />
			<TextField name="company.vat" labelText="Partita IVA" type="text" />
			<TextField
				name="company.sdi"
				labelText="Codice SDI (opzionale)"
				type="text"
			/>
			<TextField name="company.pec" labelText="PEC" type="email" />
		{/if}

		<hr />

		<TextField
			name="{$form.billingOption}.address.street"
			labelText="Indirizzo"
			type="text"
			placeholder={p.address}
		/>
		<TextField
			name="{$form.billingOption}.address.town"
			labelText="Città"
			type="text"
		/>
		<div class="field-w30">
			<TextField
				name="{$form.billingOption}.address.province"
				labelText="Provincia"
				type="text"
			/>
		</div>
		<div class="field-w50">
			<TextField
				name="{$form.billingOption}.address.cap"
				labelText="CAP"
				type="text"
			/>
		</div>

		<FormError />

		<hr />

		<SubmitButton>Vai al pagamento</SubmitButton>
	{/if}
</Form>

<!--  -->
<style>
	.field-w30 {
		width: 30%;
	}

	.field-w50 {
		width: 50%;
	}

	td,
	th {
		padding: var(--s-1);
	}

	table {
		/* width: 100%; */
		border-collapse: collapse;
		margin-top: var(--s-3);
		margin-bottom: var(--s-3);
	}

	td,
	th,
	table {
		border: 1px solid gray;
	}

	th {
		width: auto;
		text-align: left;
	}

	h1 {
		margin-bottom: var(--s-3);
	}

	.notes {
		margin-bottom: var(--s-3);
	}
</style>
