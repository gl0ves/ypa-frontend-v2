<script lang="ts">
	import LoginForm from '$lib/components/Forms/LoginForm/LoginForm.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';

	let { data } = $props();
</script>

<Layout maxWidth="sm">
	<LoginForm {data} />
</Layout>
