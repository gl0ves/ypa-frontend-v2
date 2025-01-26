<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';

	let { email } = $props();
</script>

<Layout maxWidth="sm">
	<Card.Root class="min-w-[360px] lg:w-[400px] ">
		<Card.Header>
			{#if !email}
				<Card.Title><YpaText size="md" weight="semibold">Error</YpaText></Card.Title>
			{:else}
				<Card.Title><YpaText size="md" weight="semibold">Email verified!</YpaText></Card.Title>
			{/if}
		</Card.Header>
		<Card.Content>
			{#if !email}
				<YpaText size="sm">
					There was an error verifying your email. Please try again or contact us.
				</YpaText>
			{:else}
				<YpaText size="sm">
					Your email has been verified. You can now <a
						class="text-primary underline"
						href={`/login?href=${email}`}>log in</a
					>.
				</YpaText>
			{/if}
		</Card.Content>
	</Card.Root>
</Layout>
