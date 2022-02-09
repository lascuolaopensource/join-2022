<form on:submit|preventDefault>
	<slot />
</form>

<style>
	form {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--s-6);
	}
</style>
