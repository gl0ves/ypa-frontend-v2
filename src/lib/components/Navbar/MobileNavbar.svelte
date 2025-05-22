<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import { navItems } from '$lib/components/Navbar/NavItems';
	import IconMenu from '~icons/mdi/menu';
	import { goto } from '$app/navigation';
	import { PUBLIC_CDN_URL } from '$env/static/public';
	import IconWhatsApp from '~icons/mdi/whatsapp';
	import IconFacebook from '~icons/mdi/facebook';
	import IconInstagram from '~icons/mdi/instagram';
	import IconPhone from '~icons/mdi/phone';
	import IconClose from '~icons/mdi/close';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import { cn } from '$lib/utils.js';

	let open = $state(false);
	let accordionValues = $state<string[]>([]);

	const handleGoTo = (href: string) => {
		open = false;
		goto(href);
	};
</script>

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
		<Sheet.Trigger 
			class={cn(
				buttonVariants({ variant: 'ghost', size: 'icon' }),
				"hover:bg-primary-foreground p-6 hover:text-primary active:bg-primary-foreground active:text-white"
			)}
		>
			<IconMenu class="text-white" />
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
					<Sheet.Close
						class={cn(
							buttonVariants({ variant: 'ghost', size: 'icon' }),
							"hover:bg-primary-foreground p-4 hover:text-primary active:bg-primary-foreground active:text-white"
						)}
					>
						<IconClose class="h-20 w-20" />
					</Sheet.Close>
				</Sheet.Header>
				<div class="py-4">
					<Accordion.Root type="multiple" bind:value={accordionValues} class="w-full">
						{#each navItems as item, index}
							{#if item.href}
								<div class="mb-4">
									<Button variant="ghost" onclick={() => handleGoTo(item.href)}>
										<YpaText weight="semibold" color="white" size="md">{item.name}</YpaText>
									</Button>
									<Separator class="mb-2" />
								</div>
							{:else if item.subNavItems}
								<Accordion.Item value={`item-${index}`} class="border-none">
									<Accordion.Trigger class="py-2 px-4 hover:bg-primary-foreground">
										<YpaText weight="semibold" color="white" size="md">{item.name}</YpaText>
									</Accordion.Trigger>
									<Accordion.Content>
										<div class="pl-4 space-y-1">
											{#each item.subNavItems as subItem}
												<Button
													class="w-full justify-start hover:bg-primary-foreground hover:text-primary active:text-white focus:text-white"
													variant="ghost"
													onclick={() => handleGoTo(subItem.href)}
												>
													<YpaText weight="semibold" color="white" size="sm">{subItem.name}</YpaText
													>
												</Button>
											{/each}
										</div>
									</Accordion.Content>
								</Accordion.Item>
								<Separator class="mb-2" />
							{/if}
						{/each}
					</Accordion.Root>
				</div>
				<div class="flex items-center justify-center gap-4 mt-4">
					<Button 
						href="tel:31618472480"
						variant="outline" 
						size="icon" 
						class="border-white bg-white hover:bg-white"
					>
						<IconPhone class="h-6 w-6 text-primary" />
					</Button>
					<Button 
						href="https://wa.me/31618472480"
						target="_blank"
						variant="ghost" 
						size="icon" 
						class="border-white bg-whatsapp hover:bg-whatsapp"
					>
						<IconWhatsApp class="h-6 w-6 text-white" />
					</Button>
					<Button 
						href="https://www.facebook.com/yourpropertyabroad/"
						target="_blank"
						variant="ghost" 
						size="icon" 
						class="border-white bg-facebook hover:bg-facebook"
					>
						<IconFacebook class="h-6 w-6 text-white" />
					</Button>
					<Button
						href="https://www.instagram.com/yourpropertyabroad"
						target="_blank"
						variant="ghost"
						size="icon"
						class="border-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600"
					>
						<IconInstagram class="h-6 w-6 text-white" />
					</Button>
				</div>
				<Sheet.Footer class="pt-8">
					<Sheet.Close
						class={cn(
							buttonVariants({ variant: 'default', size: 'sm' }),
							"bg-white text-black font-semibold"
						)}
					>
						CLOSE
					</Sheet.Close>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Portal>
	</Sheet.Root>
</div>
