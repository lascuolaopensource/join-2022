<script context="module">
	export const key = {};
</script>

<script lang="ts">
	import { icons } from '$lib/icons';
	import { setContext } from 'svelte';

	export let title = '';
	export let open = false;

	function close() {
		open = false;
	}

	setContext(key, {
		close
	});
</script>

<!-- -->

{#if open}
	<div class="modal">
		<div class="modal__top">
			<p class="modal__title">
				<strong>
					{title}
				</strong>
			</p>
			<button class="modal__close" on:click={close}>
				<svelte:component this={icons.close} />
			</button>
		</div>
		<div class="modal__content">
			<slot />
		</div>
	</div>
{/if}

<!--  -->
<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;

		background-color: white;
	}

	.modal__top {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		padding: var(--s-1) var(--s-3);
		border-bottom: 1px solid black;
	}

	button {
		border: none;
		width: 32px;
		height: 32px;
		background-color: lightgray;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.modal__content {
		padding: var(--s-3);
	}
</style>
