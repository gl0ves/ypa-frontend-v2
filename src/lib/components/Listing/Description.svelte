<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	let {
		descriptions
	}: {
		descriptions: {
			en: string[];
			de: string[];
			es: string[];
			nl: string[];
		};
	} = $props();

	let accordionValue = 'item-1';
</script>

<Accordion.Root type="single" value={accordionValue}>
	{#if descriptions.en.length}
		<Accordion.Item value="item-1">
			<Accordion.Trigger
				><YpaText weight="semibold" size="md">Description (EN)</YpaText></Accordion.Trigger
			>
			<Accordion.Content aria-expanded={true}>
				<YpaText color="read" weight="semibold" size="sm">
					{#each descriptions.en as sentence, idx}
						<p>{sentence}</p>
						{#if idx % 3 === 0}
							<br />
						{/if}
					{/each}
				</YpaText>
			</Accordion.Content>
		</Accordion.Item>
	{/if}

	{#if descriptions.de.length}
		<Accordion.Item value="item-2">
			<Accordion.Trigger
				><YpaText weight="semibold" size="md">Beschreibung (DE)</YpaText></Accordion.Trigger
			>
			<Accordion.Content>
				<YpaText weight="semibold" size="sm">
					{#each descriptions.de as sentence, idx}
						<p>{sentence}</p>
						{#if idx % 3 === 0}
							<br />
						{/if}
					{/each}
				</YpaText>
			</Accordion.Content>
		</Accordion.Item>
	{/if}

	{#if descriptions.es.length}
		<Accordion.Item value="item-3">
			<Accordion.Trigger
				><YpaText weight="semibold" size="md">Descripción (ES)</YpaText></Accordion.Trigger
			>
			<Accordion.Content>
				<YpaText weight="semibold" size="sm">
					{#each descriptions.es as sentence, idx}
						<p>{sentence}</p>
						{#if idx % 3 === 0}
							<br />
						{/if}
					{/each}
				</YpaText>
			</Accordion.Content>
		</Accordion.Item>
	{/if}

	{#if descriptions.nl.length}
		<Accordion.Item value="item-4">
			<Accordion.Trigger
				><YpaText weight="semibold" size="md">Beschrijving (NL)</YpaText></Accordion.Trigger
			>
			<Accordion.Content>
				<YpaText weight="semibold" size="sm">
					{#each descriptions.nl as sentence, idx}
						<p>{sentence}</p>
						{#if idx % 3 === 0}
							<br />
						{/if}
					{/each}
				</YpaText>
			</Accordion.Content>
		</Accordion.Item>
	{/if}
</Accordion.Root>
