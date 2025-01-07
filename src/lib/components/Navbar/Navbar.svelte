<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { navItems } from '$lib/components/Navbar/NavItems';
	import IconMenu from '~icons/mdi/menu';
	import IconChevronDown from '~icons/mdi/chevron-down';
	import { goto } from '$app/navigation';

	let open = $state(false);
</script>

<Menubar.Root class="sticky top-0 z-50 lg:flex justify-end hidden h-20">
	{#each navItems as item}
		<Menubar.Menu>
			{#if item.subNavItems}
				<Menubar.Trigger>{item.name}</Menubar.Trigger>
				<Menubar.Content>
					{#each item.subNavItems as subItem}
						<Menubar.Item onclick={() => goto(subItem.href)}>{subItem.name}</Menubar.Item>
					{/each}
				</Menubar.Content>
			{:else}
				<Menubar.Trigger onclick={() => goto(item.href)}>{item.name}</Menubar.Trigger>
			{/if}
		</Menubar.Menu>
	{/each}
</Menubar.Root>

<div class="lg:hidden">
	<Drawer.Root bind:open direction="bottom">
		<Drawer.Trigger>
			<Menubar.Root>
				<Menubar.Menu>
					<Menubar.Trigger>
						<IconMenu class="text-lg"></IconMenu>
					</Menubar.Trigger>
				</Menubar.Menu>
			</Menubar.Root>
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="m-6">
				{#each navItems as item}
					<div class="mb-4">
						{#if item.href}
							<div>
								<Button
									class="text-lg font-medium leading-none"
									variant="link"
									onclick={() => goto(item.href)}>{item.name}</Button
								>
							</div>
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
									<div>
										<Button
											class="text-muted-foreground"
											variant="link"
											onclick={() => goto(subItem.href)}>{subItem.name}</Button
										>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="m-6"></div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close>
					<Button variant="outline">Close</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
