<script lang="ts">
	import SignupForm from '$lib/components/Forms/SignupForm/SignupForm.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	const { data } = $props();
</script>

<Layout maxWidth="sm">
	<SignupForm {data} />
</Layout>
