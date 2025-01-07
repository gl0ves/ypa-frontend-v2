<script lang="ts">
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import YpaTitle from '$lib/components/ui/text/YpaTitle.svelte';
	import CurrencyForm from '$lib/components/CurrencyForm.svelte';
</script>

<Layout maxWidth="sm">
	<div class="flex justify-center pt-12 mb-4">
		<img
			src="https://cdn.yourpropertyabroad.com/static/optimal-currency-exchange-logo-your-property-abroad-spain"
			alt="optimal currency exchange foreign property buyer spain"
			width="300px"
		/>
	</div>
	<div class="mb-4">
		<YpaTitle>Fast, Experienced and Affordable Currency Exchange with Optimal Currency</YpaTitle>
	</div>
	<div class="mb-4">
		<YpaText size="sm">
			Buying property in Spain is an exciting step and with so much to consider, it's easy to
			overlook the fact that there are substantial savings to be made when you transfer money to
			another country. If you use your bank to convert currencies for a holding deposit, property
			purchase or ongoing expenses, the chances are that you will be paying unnecessary transfer
			fees and getting a poor exchange rate.
		</YpaText>
	</div>

	<div class="flex justify-center flex-col items-center mb-4">
		<iframe
			title="Optimal Currency Exchange Introduction"
			src="https://player.vimeo.com/video/721002806?h=b8ab695c9c"
			width="100%"
			height="360"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
		></iframe>
	</div>

	<div class="mb-4">
		<YpaText size="sm">
			Optimal Currency specialise in overseas property payments and make the process easier, cheaper
			and faster. Unlike some currency brokers, they welcome clients from around the world, and with
			local banking in the eurozone, UK and the US, they can eliminate wire and correspondent bank
			fees, so funds sent usually arrive in full & within 24 hours. They also provide access to
			superior exchange rates.
		</YpaText>
	</div>

	<div class="mb-4">
		<YpaText size="sm">
			If you are concerned your budget might be threatened by adverse currency market movements and
			want to fix a rate of exchange in advance, or be alerted to big rate changes, they can help.
			With Optimal, you'll have a highly experienced currency broker as your single point of
			contact; ready to listen to your requirements and provide the most efficient, cost-effective
			solution. Their brokers are available directly via email, phone or WhatsApp - no need to go
			through impersonal call centres.
		</YpaText>
	</div>
	<br />

	<YpaText size="md" weight="semibold">Why choose Optimal Currency?</YpaText>

	<YpaText size="sm">
		<ol>
			<li>
				Exceptional customer service - your currency broker is with you every step of the way, you
				are not passed from one department to another. This single point of contact model ensures
				speedy account set up, a thorough understanding of your needs and seamless communication
				during the currency conversion & transfer process.
			</li>
			<li>
				Knowledge and experience: all Optimal brokers have been working in the FX industry for 10
				years plus.
			</li>
			<li>Friendly family run business rather than a faceless corporation.</li>
			<li>
				Licenced to trade with clients resident in the USA, EU and most countries around the world.
			</li>
			<li>Combination of latest technology and world class customer service</li>
		</ol>
	</YpaText>
	<br />
	<YpaText size="md" weight="semibold"
		>Want more information by broker at Optimal Currency Exchange?</YpaText
	>
	<YpaText size="sm">Submit your details via the form below:</YpaText>
	<div>
		<CurrencyForm />
	</div>
</Layout>
