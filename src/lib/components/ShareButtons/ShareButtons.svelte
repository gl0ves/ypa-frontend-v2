<script lang="ts">
	import IconFacebook from '~icons/mdi/facebook';
	import IconWhatsApp from '~icons/mdi/whatsapp';
	import IconEmail from '~icons/mdi/email-outline';
	import IconCopy from '~icons/mdi/content-copy';
	import { page } from '$app/state';

	const { listingUrl = page.url }: { listingUrl?: URL } = $props();
</script>

<a
	href="https://www.facebook.com/sharer/sharer.php?u={listingUrl}"
	target="_blank"
	class="p-2 rounded-full flex items-center text-facebook hover:bg-gray-100"
>
	<IconFacebook class="h-6 w-6" />
</a>
<a
	href="whatsapp://send?text={listingUrl}"
	data-action="share/whatsapp/share"
	target="_blank"
	class="p-2 rounded-full flex items-center text-whatsapp hover:bg-gray-100"
>
	<IconWhatsApp class="h-6 w-6" />
</a>
<a
	href={`mailto:?subject=Check out this&body=${listingUrl}`}
	target="_blank"
	class="p-2 rounded-full flex items-center hover:bg-gray-100"
>
	<IconEmail class="h-6 w-6 text-gmail" />
</a>
<button
	class="p-2 rounded-full flex items-center hover:bg-gray-100 cursor-pointer"
	onclick={() => navigator.clipboard.writeText(listingUrl.toString())}
	onkeydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			navigator.clipboard.writeText(listingUrl.toString());
		}
	}}
>
	<IconCopy class="h-6 w-6 text-primary" />
</button>
