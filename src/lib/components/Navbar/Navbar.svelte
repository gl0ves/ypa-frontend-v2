<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
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
	import IconClose from '~icons/mdi/close';

	let open = $state(false);
	const handleGoTo = (href: string) => {
		open = false;
		goto(href);
	};
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

<div class="lg:hidden flex justify-between items-center bg-primary p-4 space-y-2">
	<a aria-label="Your Property Abroad Homepage" href="/">
		<img
			class="max-h-12"
			height="20"
			alt="Your Property Abroad Logo"
			src={`${PUBLIC_CDN_URL}/static/logo.png`}
		/>
	</a>
	<Sheet.Root bind:open>
		<Sheet.Trigger>
			<Button
				variant="ghost"
				size="icon"
				class="hover:bg-primary-foreground p-6 hover:text-primary active:bg-primary-foreground active:text-white"
			>
				<IconMenu class="text-white" />
			</Button>
		</Sheet.Trigger>
		<Sheet.Portal>
			<Sheet.Overlay />
			<Sheet.Content side="right" class="w-full h-full overflow-y-auto bg-primary text-white">
				<Sheet.Header class="flex justify-between items-center flex-row">
					<Sheet.Title>
						<a class="" aria-label="Your Property Abroad Homepage" href="/">
							<img
								class="max-h-12"
								height="20"
								alt="Your Property Abroad Logo"
								src={`${PUBLIC_CDN_URL}/static/logo.png`}
							/>
						</a>
					</Sheet.Title>
					<Sheet.Close>
						<Button
							variant="ghost"
							size="icon"
							class="hover:bg-primary-foreground p-4 hover:text-primary active:bg-primary-foreground active:text-white"
						>
							<IconClose class="h-20 w-20" />
						</Button>
					</Sheet.Close>
				</Sheet.Header>
				<div class="py-4">
					{#each navItems as item}
						<div class="mb-4">
							{#if item.href}
								<Button
									class="w-full justify-start text-md font-medium text-white hover:bg-primary-foreground hover:text-primary active:text-white focus:text-white"
									variant="ghost"
									onclick={() => handleGoTo(item.href)}
								>
									{item.name}
								</Button>
								<Separator class="mb-2" />
							{:else}
								<div class="px-4 py-2">
									<h4 class="flex items-center justify-between text-md font-medium text-white">
										{item.name}
										<IconChevronDown class="h-4 w-4" />
									</h4>
								</div>
								<Separator class="mb-2" />
							{/if}
							{#if item.subNavItems}
								<div class="pl-4">
									{#each item.subNavItems as subItem}
										<Button
											class="w-full justify-start text-white hover:bg-primary-foreground hover:text-primary active:text-white focus:text-white"
											variant="ghost"
											onclick={() => handleGoTo(subItem.href)}
										>
											{subItem.name}
										</Button>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
				<div class="flex items-center justify-center gap-4 mt-4">
					<a href="tel:31618472480" target="_blank">
						<Button variant="outline" size="icon" class="border-white bg-white hover:bg-white">
							<IconPhone class="h-6 w-6 text-primary" />
						</Button>
					</a>
					<a href="https://wa.me/31618472480" target="_blank">
						<Button variant="ghost" size="icon" class="border-white bg-whatsapp hover:bg-whatsapp">
							<IconWhatsApp class="h-6 w-6 text-white" />
						</Button>
					</a>
					<a href="https://www.facebook.com/yourpropertyabroad/" target="_blank">
						<Button variant="ghost" size="icon" class="border-white bg-facebook hover:bg-facebook">
							<IconFacebook class="h-6 w-6 text-white" />
						</Button>
					</a>
					<a href="https://www.instagram.com/yourpropertyabroad" target="_blank">
						<Button
							variant="ghost"
							size="icon"
							class="border-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600"
						>
							<IconInstagram class="h-6 w-6 text-white" />
						</Button>
					</a>
				</div>
				<Sheet.Footer class="pt-8">
					<Sheet.Close>
						<Button size="sm" variant="default" class="bg-white text-black font-semibold"
							>CLOSE</Button
						>
					</Sheet.Close>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Portal>
	</Sheet.Root>
</div>
