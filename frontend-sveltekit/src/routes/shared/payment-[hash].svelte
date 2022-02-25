<script lang="ts">
	import { page } from '$app/stores';
	import { post, headersAuth, endpoints } from '$lib/requestUtils';
	import { setFormError } from '$lib/components/form';
	import { Payment } from '$lib/components/formPages';
	import type { f } from 'shared';

	//

	async function onSubmit(values: f.billing.bType) {
		try {
			const body: f.payment.pType = {
				paymentHash: $page.params.hash,
				billing: values
			};
			await post(fetch, endpoints.pay, body, headersAuth());

			// Qui va una logica che reindirizza
			// a seconda della relazione che ha il pagamento
		} catch (e) {
			setFormError(e);
		}
	}
</script>

<Payment {onSubmit} />
