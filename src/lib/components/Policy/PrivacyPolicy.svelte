<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let showDialog = false;

	onMount(() => {
		// Any initialization if needed
	});
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<p class="text-blue-">View Privacy Policy</p>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Privacy Policy</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<!-- Default content for Privacy Policy if no slot is provided -->
			<p>Here is the privacy policy...</p>
		</Dialog.Description>
		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="secondary">Close</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
