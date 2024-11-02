<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { navItems } from '$lib/components/Navbar/NavItems';
	import IconMenu from '~icons/mdi/menu';
	import IconChevronDown from '~icons/mdi/chevron-down';
	import { goto } from '$app/navigation';
	import { Item } from '../ui/accordion';

	let open = $state(false);
</script>

<Menubar.Root class="sticky top-0 z-50 lg:flex hidden">
	<Menubar.Menu>
		<Menubar.Item>
			<img src="https://cdn.yourpropertyabroad.com/static/logo.png" alt="Logo" class="h-12" />
		</Menubar.Item>
		<Menubar.Separator />
		{#each navItems as item}
			{#if item.subNavItems}
				<Menubar.Trigger>{item.name}</Menubar.Trigger>
				<Menubar.Content>
					{#each item.subNavItems as subItem}
						<Menubar.Item on:click={() => goto(subItem.href)}>{subItem.name}</Menubar.Item>
					{/each}
				</Menubar.Content>
			{:else}
				<Menubar.Item on:click={() => goto(item.href)}>{item.name}</Menubar.Item>
			{/if}
		{/each}
	</Menubar.Menu>
</Menubar.Root>

<div class="lg:hidden">
	<Drawer.Root bind:open direction="bottom">
		<Drawer.Trigger asChild let:builder>
			<Menubar.Root>
				<Menubar.Menu>
					<Menubar.Item>
						<Button variant="link" builders={[builder]}
							><IconMenu class="text-lg"></IconMenu></Button
						>
					</Menubar.Item>
				</Menubar.Menu>
			</Menubar.Root>
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="m-6">
				{#each navItems as item}
					<div class="mb-4">
						{#if item.href}
							<Button
								class="text-lg font-medium leading-none"
								variant="link"
								on:click={() => goto(item.href)}>{item.name}</Button
							>
							<Separator class="mb-2" />
						{:else}
							<h4 class="flex flex-row text-lg ml-4 font-medium leading-none">
								{item.name}<IconChevronDown class="text-lg" />
							</h4>
							<Separator class="mt-3 mb-2" />
						{/if}
						{#if item.subNavItems}
							<div>
								{#each item.subNavItems as subItem}
									<Button
										class="text-muted-foreground"
										variant="link"
										on:click={() => goto(subItem.href)}>{subItem.name}</Button
									>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="m-6"></div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Close</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
