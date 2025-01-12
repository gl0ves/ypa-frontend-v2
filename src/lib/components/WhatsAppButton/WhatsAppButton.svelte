<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';

	const handleClick = () => {
		const currentUrl = window.location.href;
		const url = `https://wa.me/31618472480?text=Hi%20Gary!%20I'm%20interested%20in%20this property%20${currentUrl}%20for%20sale.`;
		window.open(url, '_blank');
	};
</script>

<Button onclick={handleClick} class={buttonVariants({ variant: 'tertiary' })}
	>WHATSAPP FOR MORE INFO</Button
>
