<script lang="ts" context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }: any) {
		return {
			status: 302,
			redirect: `/inside/courses/active`
		};
	}
</script>
