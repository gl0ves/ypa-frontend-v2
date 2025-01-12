<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	class={cn(
		'data-[highlighted]:bg-primary-foreground data-[state=open]:bg-primary-foreground data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none',
		className
	)}
	{...restProps}
/>
