<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	export let options: string[] = [];
</script>

<Select.Root
	multiple
	selected={selectedColors}
	onSelectedChange={(s) => {
		if (s) {
			formData.colors = s.map((c) => c.value);
		} else {
			formData.colors = [];
		}
	}}
>
	{#each formData.colors as color}
		<input name={attrs.name} hidden value={color} />
	{/each}
	<Select.Trigger {...attrs}>
		<Select.Value placeholder="Select colors" />
	</Select.Trigger>
	<Select.Content>
		{#each Object.entries(colors) as [value, label]}
			<Select.Item {value} {label} />
		{/each}
	</Select.Content>
</Select.Root>
