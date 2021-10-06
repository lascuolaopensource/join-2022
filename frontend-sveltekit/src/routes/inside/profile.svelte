<script lang="ts">
	import userStore from '$lib/stores/userStore';

	let username = $userStore.username;
	let email = $userStore.email;

	let readonly = true;

	// To edit profile:
	// https://www.drewtown.dev/post/using-strapi-policies-to-create-editable-user-profiles/

	// function edit() {
	// 	readonly = false;
	// }

	// function save() {
	// 	readonly = true;
	// }

	// function undo() {
	// 	readonly = true;
	// 	username = $userStore.username;
	// 	email = $userStore.email;
	// }
</script>

<input {readonly} type="text" bind:value={username} />
<input {readonly} type="text" bind:value={email} />

<!-- {#if readonly}
	<button on:click={edit}>Edit data</button>
{:else}
	<button on:click={save}>Save edits</button>
	<button on:click={undo}>Undo</button>
{/if} -->
