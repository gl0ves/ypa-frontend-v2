<script>
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import YpaTitle from '$lib/components/ui/text/YpaTitle.svelte';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import { PUBLIC_CDN_URL } from '$env/static/public';
</script>

<Layout maxWidth="sm">
	<div class="container pt-10">
		<div class="mb-2">
			<YpaTitle>Your Property Abroad: Spanish Real Estate Portal</YpaTitle>
		</div>
		<div class="mb-2">
			<YpaText size="sm"
				>Find your dream property on yourpropertyabroad.com amongst thousands of listings all over
				Spain, The Canary Islands and The Balearics. We have 20+ years experience in Spanish real
				estate, and work with trusted agencies in Spain to showcase the best properties on the
				market. Contact us if you have questions, and we can set up a property viewing for you if
				you wish.
			</YpaText>
		</div>
		<div class="mb-2">
			<YpaText size="md" weight="semibold">
				HOW DO I FIND A SPANISH PROPERTY VIA YOUR PROPERTY ABROAD?
			</YpaText>
		</div>
		<div class="mb-2">
			<YpaText size="sm"
				>There are a few options, depending on your situation. Choose below:</YpaText
			>
		</div>
		<ol>
			<li class="mb-2">
				<YpaText size="sm" weight="semibold">
					1. I've only just started looking and have no idea what I want yet
				</YpaText>
				<YpaText size="sm">
					<a
						class="underline"
						href="https://www.facebook.com/yourpropertyabroad/groups/"
						target="_blank">Join one of our Facebook Groups here</a
					>
				</YpaText>
			</li>
			<li class="mb-2">
				<YpaText size="sm" weight="semibold"
					>2. I know exactly what kind of property I want and where, but haven't found it</YpaText
				>
				<YpaText size="sm">
					<a href="/" class="underline">Go here and click the button "Create a Property Alert"</a>
					to get notified as soon as it comes to market
				</YpaText>
			</li>
			<li class="mb-2">
				<YpaText size="sm" weight="semibold"
					>3. I've found a property I want online and want to view it
				</YpaText>
				<YpaText size="sm">
					Contact us via
					<a href="https://wa.me/31618472480" target="_blank" class="underline">Whatsapp</a>
					or the contact form on the property information pages.
				</YpaText>
			</li>
			<li class="mb-4">
				<YpaText size="sm" weight="semibold"
					>4. I need a mortgage, currency exchange or legal advice.
				</YpaText>
				<YpaText size="sm">Tap “Other Services” in the menu above to enquire.</YpaText>
			</li>
			<div class="mb-2">
				<YpaText size="sm" weight="semibold"
					>Make sure to search our website and contact us via Whatsapp, phone or email if you have
					any questions.
				</YpaText>
			</div>
			<div class="mb-2 underline">
				<a href="/">
					<YpaText size="sm" weight="semibold">START YOUR SEARCH HERE</YpaText>
				</a>
			</div>
			<div class="mb-2">
				<YpaText size="sm"
					>See what property buyers have to say about us on
					<span class="underline">
						<a href="https://www.trustpilot.com/review/www.yourpropertyabroad.com">Trustpilot.com</a
						>
					</span>
				</YpaText>
			</div>
			<img
				src={`${PUBLIC_CDN_URL}/static/about-banner.png`}
				alt="Find a property in Spain with Your Property Abroad"
			/>
		</ol>
	</div>
</Layout>
