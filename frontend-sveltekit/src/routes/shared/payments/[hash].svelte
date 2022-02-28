<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { post, headersAuth, endpoints } from '$lib/requestUtils';
	import { setFormError } from '$lib/components/form';
	import { Payment } from '$lib/components/formPages';
	import type { f } from 'shared';

	//

	async function onSubmit(values: f.billing.bType) {
		try {
			// Creazione body
			const body: f.payment.pType = {
				paymentHash: $page.params.hash,
				billing: values
			};

			// Invio richiesta
			const res: f.payment.pResType = await post(
				fetch,
				endpoints.pay,
				body,
				headersAuth()
			);

			// Si va al pagamento se la risposta è positiva
			if (res.sessionUrl) {
				goto(res.sessionUrl);
			} else {
				throw new Error(
					'Could not create payment session, please try again later or contact admin if error persists'
				);
			}
		} catch (e) {
			setFormError(e);
		}
	}
</script>

<Payment {onSubmit} />
