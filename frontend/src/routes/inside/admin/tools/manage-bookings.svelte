<script lang="ts">
	import { req } from '$lib/requestUtils';
	import type { types as t } from 'shared';
	import { writable } from 'svelte/store';

	import { Container, Modal, Button } from '$lib/components';
	import BookingCard from '$lib/partials/admin/tools/manage-bookings/bookingCard.svelte';

	//

	let bookings: Array<t.ToolsBookingEntity> = [];
	let promise = getData();

	async function getData() {
		const res = await req.getToolsBookings();
		bookings = res.data;
	}

	//

	let bookingToDelete: t.ToolsBookingEntity | undefined = undefined;

	const visible = writable(false);

	function openDeleteModal(booking: t.ToolsBookingEntity) {
		bookingToDelete = booking;
		$visible = true;
	}

	function closeDeleteModal() {
		bookingToDelete = undefined;
		$visible = false;
	}

	async function deleteBooking() {
		const id = bookingToDelete?.id;
		if (id) {
			await req.deleteBooking(id);
			$visible = false;
			promise = getData();
		}
	}
</script>

<!--  -->

<Container>
	{#await promise then res}
		{#each bookings as booking}
			<BookingCard
				{booking}
				on:click={() => {
					openDeleteModal(booking);
				}}
			/>
		{/each}
		{#if bookings.length == 0}
			<p class="text-gray-400">Non ci sono prenotazioni</p>
		{/if}
	{/await}
</Container>

{#if bookingToDelete}
	<Modal title="Elimina prenotazione" {visible}>
		<!-- Info -->
		<Container>
			<p class="mb-4">
				<strong>Sei sicuro di voler eliminare questa prenotazione?</strong>
			</p>
			<BookingCard booking={bookingToDelete} button={false} />
		</Container>

		<!-- Actions -->
		<svelte:fragment slot="bottom">
			<div
				class="px-4 pb-4 pt-2 sticky bottom-0 bg-white flex flex-row justify-end space-x-2"
			>
				<Button on:click={closeDeleteModal} hierarchy="secondary"
					>Annulla</Button
				>
				<Button on:click={deleteBooking}>Elimina</Button>
			</div>
		</svelte:fragment>
	</Modal>
{/if}
