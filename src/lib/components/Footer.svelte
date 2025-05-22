<script>
	import IconPhone from '~icons/mdi/phone';
	import IconWhatsapp from '~icons/mdi/whatsapp';
	import IconEmail from '~icons/mdi/email';
	import IconFacebook from '~icons/mdi/facebook';
	import TermsAndConditions from './Policy/TermsAndConditions.svelte';
	import PrivacyPolicy from './Policy/PrivacyPolicy.svelte';
	import YpaText from './ui/text/YpaText.svelte';
</script>

<footer class="bg-primary flex lg:justify-center text-white w-full absolute mt-4 p-8">
	<div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl">
		<!-- Contact Column -->
		<div class="col-span-1">
			<h3 class="font-semibold mb-2 text-white underline">CONTACT US</h3>
			<div class="flex flex-col gap-2">
				<a href="tel:31618472480" class="flex items-center text-white hover:underline">
					<IconPhone class="mr-2" /><span class="font-semibold">+31 61 84 72 480</span>
				</a>

				<a
					href="https://wa.me/31618472480"
					target="_blank"
					class="flex items-center text-white hover:underline"
				>
					<IconWhatsapp class="mr-2" /><span class="font-semibold">Whatsapp</span>
				</a>

				<a
					href="email:hello@yourpropertyabroad.com"
					target="_blank"
					class="flex items-center text-white hover:underline"
				>
					<IconEmail class="mr-2" /><span class="font-semibold">Email</span>
				</a>

				<a
					href="https://www.facebook.com/yourpropertyabroad/"
					target="_blank"
					class="flex items-center text-white hover:underline"
				>
					<IconFacebook class="mr-2" /><span class="font-semibold">Facebook</span>
				</a>

				<!-- TODO: Implement Dialog component -->
				<!-- 
            <button class="flex items-center text-white">
              <IconCalendar class="mr-2" />
              <Dialog reference="" text="Book a call back" style="font-size: 0.875rem;" class="underline" />
            </button>
            -->

				<a href="https://www.trustpilot.com/review/www.yourpropertyabroad.com" target="_blank">
					<img
						src="https://cdn.yourpropertyabroad.com/static/trustpilot_logo_white.png"
						alt="Trustpilot"
						class="max-w-[150px] h-[50px] object-contain"
					/>
				</a>

				<TermsAndConditions
					><YpaText size="sm" weight="semibold" color="white">Terms and Condition</YpaText
					></TermsAndConditions
				>
				<PrivacyPolicy />
			</div>
		</div>

		<!-- Properties Column -->
		<div class="col-span-1">
			<h3 class="font-semibold mb-2 text-white underline">PROPERTIES FOR SALE IN SPAIN</h3>
			<div class="flex flex-col gap-2">
				<a class="text-white hover:underline" href="/"
					><h3 class="font-semibold">All Spanish Properties</h3></a
				>
				<a class="text-white hover:underline" href="/?region=lanzarote"
					><h3 class="font-semibold">Properties in Lanzarote</h3></a
				>
				<a class="text-white hover:underline" href="/?region=tenerife"
					><h3 class="font-semibold">Properties in Tenerife</h3></a
				>
				<a class="text-white hover:underline" href="/?region=gran-canaria"
					><h3 class="font-semibold">Properties in Gran Canaria</h3></a
				>
				<a class="text-white hover:underline" href="/?region=costa-blanca"
					><h3 class="font-semibold">Properties in Costa Blanca</h3></a
				>
				<a class="text-white hover:underline" href="/?region=costa-del-sol"
					><h3 class="font-semibold">Properties in Costa del Sol</h3></a
				>
				<a class="text-white hover:underline" href="/?region=costa-almeria"
					><h3 class="font-semibold">Properties in Costa Almería</h3></a
				>
				<a class="text-white hover:underline" href="/?region=costa-calida"
					><h3 class="font-semibold">Properties in Costa Cálida</h3></a
				>
				<a class="text-white hover:underline" href="/?region=mallorca"
					><h3 class="font-semibold">Properties in Mallorca</h3></a
				>
				<a class="text-white hover:underline" href="/?region=menorca"
					><h3 class="font-semibold">Properties in Menorca</h3></a
				>
				<a class="text-white hover:underline" href="/?region=ibiza"
					><h3 class="font-semibold">Properties in Ibiza</h3></a
				>
			</div>
		</div>

		<!-- Information Column -->
		<div class="col-span-1">
			<h3 class="font-semibold mb-2 text-white underline">INFORMATION & SERVICES</h3>
			<div class="flex flex-col gap-2">
				<a
					class="text-white hover:underline"
					href="/buyer-information/brexit-legal-guide-lexidy-law-boutique"
				>
					<h3 class="font-semibold">Brexit: UK Legal & Financial Info</h3>
				</a>
				<a class="text-white hover:underline" href="/buyer-information">
					<h3 class="font-semibold">Buyer Information</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://yourpropertyabroad.com/blog/"
					target="_blank"
				>
					<h3 class="font-semibold">Spain property blog</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://yourpropertyabroad.com/directory/"
					target="_blank"
				>
					<h3 class="font-semibold">Spain business directory</h3>
				</a>
				<a class="text-white hover:underline" href="/services/mortgage">
					<h3 class="font-semibold">Mortgage services</h3>
				</a>
				<a class="text-white hover:underline" href="/services/currency-exchange">
					<h3 class="font-semibold">Currency exchange</h3>
				</a>
			</div>
		</div>

		<!-- Facebook Groups Column -->
		<div class="col-span-1">
			<h3 class="font-semibold mb-2 text-white underline">JOIN A FACEBOOK GROUP</h3>
			<div class="flex flex-col gap-2">
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleinlanzarote/"
					target="_blank"
				>
					<h3 class="font-semibold">Lanzarote Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleintenerife/"
					target="_blank"
				>
					<h3 class="font-semibold">Tenerife Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleingrancanaria/"
					target="_blank"
				>
					<h3 class="font-semibold">Gran Canaria Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleincostablanca/"
					target="_blank"
				>
					<h3 class="font-semibold">Costa Blanca Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleincostadelsol/"
					target="_blank"
				>
					<h3 class="font-semibold">Costa del Sol Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleincostaalmeria/"
					target="_blank"
				>
					<h3 class="font-semibold">Costa Almería Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleincostacalida/"
					target="_blank"
				>
					<h3 class="font-semibold">Costa Cálida Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleinmenorca/"
					target="_blank"
				>
					<h3 class="font-semibold">Menorca Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleinmallorca/"
					target="_blank"
				>
					<h3 class="font-semibold">Mallorca Facebook group</h3>
				</a>
				<a
					class="text-white hover:underline"
					href="https://www.facebook.com/groups/propertiesforsaleinibiza/"
					target="_blank"
				>
					<h3 class="font-semibold">Ibiza Facebook group</h3>
				</a>
			</div>
		</div>
	</div>
</footer>
