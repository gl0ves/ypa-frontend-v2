<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import { navItems } from '$lib/components/Navbar/NavItems';
	import { goto } from '$app/navigation';
	import { PUBLIC_CDN_URL } from '$env/static/public';
	import YpaText from '../ui/text/YpaText.svelte';
	import IconWhatsApp from '~icons/mdi/whatsapp';
	import IconFacebook from '~icons/mdi/facebook';
	import IconInstagram from '~icons/mdi/instagram';
	import IconPhone from '~icons/mdi/phone';
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
