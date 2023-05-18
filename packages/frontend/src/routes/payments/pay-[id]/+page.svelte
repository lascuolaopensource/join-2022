<script lang="ts">
	import type { PageData } from './$types';
	import { formatters as f, routes as r } from 'join-shared';

	import { Container } from '$lib/components';
	import {
		Heading,
		Table,
		TableBodyCell as Td,
		TableBodyRow as Tr,
		TableHeadCell as Th,
		Hr,
		Card
	} from 'flowbite-svelte';

	import { Form, Input, Radio } from '$lib/form';
	import type { RadioOptions } from '$lib/form/Radio.svelte';

	export let data: PageData;

	const info = data.info!;
	const { schema: validationSchema, values: initialValues } = r.Pay.Execute;

	const billingOptions = r.Billing.Options;

	const options: RadioOptions = [
		{ value: billingOptions[0], label: 'Me (the Owner)' },
		{ value: billingOptions[1], label: 'Someone different from the owner' },
		{ value: billingOptions[2], label: 'A company' }
	];
</script>

<!--  -->

<Container direction="column" padding spaceBetween narrow>
	<Heading tag="h3">Payment</Heading>

	<Table divClass="w-40">
		<Tr trClass="border-[1px] border-gray-200">
			<Th>Owner</Th>
			<Td>{info.owner.name} {info.owner.surname}</Td>
		</Tr>
		<Tr trClass="border-[1px] border-gray-200">
			<Th>Subject</Th>
			<Td>{info.category}<br />{info.title}</Td>
		</Tr>
		<Tr trClass="border-[1px] border-gray-200">
			<Th>Amount</Th>
			<Td>
				{f.formatPriceNumber(info.price)}
			</Td>
		</Tr>
		<Tr trClass="border-[1px] border-gray-200">
			<Th>Deadline</Th>
			<Td>
				{f.formatDate(info.deadline)}
			</Td>
		</Tr>
	</Table>

	<Form {validationSchema} {initialValues} let:values>
		{@const billingOption = values['billingOption']}

		<Hr />

		<Heading tag="h3">Billing info</Heading>

		<Card size="xl">
			<div class="space-y-8">
				<Heading tag="h4">Data</Heading>

				<Radio
					name="billingOption"
					{options}
					label="Who is going to pay (and be billed?)"
				/>

				{#if billingOption == billingOptions[0]}
					<Input name="owner.fiscalCode" label="Fiscal code" type="text" />
				{:else if billingOption == billingOptions[1]}
					<Input name="person.name" label="Name" type="text" />
					<Input name="person.surname" label="Surname" type="text" />
					<Input name="person.fiscalCode" label="Fiscal code" type="text" />
					<Input name="person.email" label="Email" type="email" />
				{:else if billingOption == billingOptions[2]}
					<Input name="company.name" label="Company name" type="text" />
					<Input name="company.vatNumber" label="VAT number" type="text" />
					<Input name="company.sdiCode" label="SDI Code - Optional" type="text" />
					<Input
						name="company.certifiedEmail"
						label="Certified mail (PEC)"
						type="email"
					/>
				{/if}
			</div>
		</Card>

		<Card size="xl">
			<div class="space-y-8">
				<Heading tag="h4">Full address</Heading>

				<Input
					name="address.country"
					label="Country"
					type="text"
					placeholder="Italy"
					required
				/>
				<Input name="address.city" label="City" type="text" placeholder="Bari" required />
				<div class="grid grid-cols-2 gap-6">
					<Input
						name="address.administrativeArea"
						label="Administrative area"
						type="text"
						placeholder="BA"
						required
					/>
					<Input
						name="address.postCode"
						label="Post code"
						type="text"
						placeholder="70121"
						required
					/>
				</div>
				<div class="grid grid-cols-4 col gap-6">
					<div class="col-span-3">
						<Input
							name="address.street"
							label="Street"
							type="text"
							placeholder="Via le Mani dal Naso"
							required
						/>
					</div>
					<div>
						<Input
							name="address.number"
							label="Number"
							type="text"
							placeholder="11/A"
							required
						/>
					</div>
				</div>
			</div>
		</Card>
	</Form>
</Container>
