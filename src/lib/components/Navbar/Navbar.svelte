<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { navItems } from '$lib/components/Navbar/NavItems';
	import IconMenu from '~icons/mdi/menu';
	import IconChevronDown from '~icons/mdi/chevron-down';
	import { goto } from '$app/navigation';
	import { PUBLIC_CDN_URL } from '$env/static/public';
	import YpaText from '../ui/text/YpaText.svelte';
	import IconWhatsApp from '~icons/mdi/whatsapp';
	import IconFacebook from '~icons/mdi/facebook';
	import IconInstagram from '~icons/mdi/instagram';
	import IconPhone from '~icons/mdi/phone';

	let open = $state(false);
</script>

<div class="flex-col sticky top-0 z-50">
	<Menubar.Root
		class="lg:flex justify-between items-center hidden h-[100px] bg-primary border-primary rounded-none"
	>
		<a class="" aria-label="Your Property Abroad Homepage" href="/">
			<img
				class="max-h-16 ml-2"
				height="20"
				alt="Your Property Abroad Logo"
				src={`${PUBLIC_CDN_URL}/static/logo.png`}
			/>
		</a>
		<div class="flex ml-auto">
			{#each navItems as item}
				<Menubar.Menu>
					{#if item.subNavItems}
						<Menubar.Trigger>
							<YpaText size="sm" color="white" weight="semibold">{item.name}</YpaText>
						</Menubar.Trigger>
						<Menubar.Content>
							{#each item.subNavItems as subItem}
								<Menubar.Item onclick={() => goto(subItem.href)}>
									<YpaText size="sm" weight="semibold">{subItem.name}</YpaText>
								</Menubar.Item>
							{/each}
						</Menubar.Content>
					{:else}
						<Menubar.Trigger onclick={() => goto(item.href)}>
							<YpaText size="sm" color="white" weight="semibold">{item.name}</YpaText>
						</Menubar.Trigger>
					{/if}
				</Menubar.Menu>
			{/each}
		</div>
	</Menubar.Root>
	<div class="h-10 bg-secondary lg:flex hidden items-center justify-between">
		<a
			class="p-2 rounded-none flex items-center text-white hover:bg-secondary-foreground"
			aria-label="Your Property Abroad Trustpilot reviews"
			href="https://www.trustpilot.com/review/www.yourpropertyabroad.com"
			target="_blank"
		>
			<img
				class="max-h-6"
				height="20"
				alt="Trustpilot logo"
				src={`${PUBLIC_CDN_URL}/static/trustpilot.png`}
			/>
		</a>
		<div class="flex items-center">
			<a
				href="tel:31618472480"
				target="_blank"
				class="p-2 rounded-none flex items-center text-white hover:bg-secondary-foreground"
			>
				<IconPhone class="h-6 w-6 mr-1" />
				<div class="lg:block hidden">
					<YpaText size="sm" weight="semibold" color="white">+31 6 18 47 24 80</YpaText>
				</div>
			</a>
			<a
				href="https://wa.me/31618472480"
				target="_blank"
				class="p-2 rounded-none flex items-center text-white hover:bg-secondary-foreground"
			>
				<IconWhatsApp class="h-6 w-6 mr-1" />
				<div class="lg:block hidden">
					<YpaText size="sm" weight="semibold" color="white">Contact us on Whatsapp</YpaText>
				</div>
			</a>
			<a
				href="https://www.facebook.com/yourpropertyabroad/"
				target="_blank"
				class="p-2 rounded-none flex items-center text-white hover:bg-secondary-foreground"
			>
				<IconFacebook class="h-6 w-6 mr-1" />
				<div class="lg:block hidden">
					<YpaText size="sm" weight="semibold" color="white">Visit us on Facebook</YpaText>
				</div>
			</a>
			<a
				href="https://www.instagram.com/yourpropertyabroad"
				target="_blank"
				class="p-2 rounded-none flex items-center text-white hover:bg-secondary-foreground"
			>
				<IconInstagram class="h-6 w-6 mr-1" />
				<div class="lg:block hidden">
					<YpaText size="sm" weight="semibold" color="white">Follow us on Instagram</YpaText>
				</div>
			</a>
		</div>
	</div>
</div>

<div class="lg:hidden flex justify-end">
	<Drawer.Root bind:open direction="bottom">
		<Drawer.Trigger>
			<div class="full p-2 justify-end flex">
				<IconMenu class="text-lg"></IconMenu>
			</div>
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
