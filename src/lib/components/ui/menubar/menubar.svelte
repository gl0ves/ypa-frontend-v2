<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = MenubarPrimitive.Props;

	let className: $$Props['class'] = undefined;
	let classes = 'flex h-20 items-center space-x-1 border-b bg-background p-1 justify-end';
	export { className as class };
</script>

<MenubarPrimitive.Root class={cn(classes, className)} {...$$restProps}>
	<slot />
</MenubarPrimitive.Root>
