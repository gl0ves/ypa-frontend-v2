<script lang="ts">
	import YpaText from './ui/text/YpaText.svelte';

	let { region } = $props();
</script>

<div class="pt-2 pb-8">
	<YpaText size="md" weight="semibold">Find your dream property for sale in {region}</YpaText>
	<YpaText size="sm" color="muted">
		<div class="mb-2">
			Find luxury real estate listings for sale right now in {region} and set up a property alert via
			the orange button below. Through our agency partners we offer villas, apartments, land, townhouses,
			fincas and more from a price range of €1,000,000 up to several millions. In contrast to many inactive
			property listing websites ours is updated daily. Whether you're looking for a luxury villa or apartment
			in Mainland Spain, The Canary Islands or the Balearics you've come to the right place.
			<strong
				>Create a "Property Alert" through the orange button above to never miss a property that
				matches your requirements.</strong
			>
		</div>
	</YpaText>
	<YpaText size="sm" color="muted">
		<div class="mb-2">
			Are you looking to buy a permanent home or an investment property to rent out?
		</div>
	</YpaText>
	<YpaText size="sm" color="muted">
		<div class="mb-2">
			If you’re interested in a property simply Whatsapp us by including the reference number, use
			the call back form or call us directly. We’re looking forward to hearing from you!
		</div>
	</YpaText>
</div>

<div class="flex flex-col">
	<YpaText size="md" weight="semibold">What clients say:</YpaText>
</div>
<div class="flex flex-col md:flex-row">
	<div class="mr-0 mb-5 md:mr-10">
		<YpaText size="sm" weight="semibold" color="primary">“Very professional...”</YpaText>
		<YpaText size="sm" color="muted"
			>“Very professional and follow you in any need you have”</YpaText
		>
		<p class="text-primary">- Attilio</p>
		<a href="https://www.trustpilot.com/review/www.yourpropertyabroad.com" target="_blank">
			<p class="text-primary underline">Source: Trustpilot</p>
		</a>
	</div>
	<div>
		<YpaText size="sm" weight="semibold" color="primary">“Very helpful”</YpaText>
		<YpaText size="sm" color="muted">
			“[...]Gary cares about what you need and constantly checking in on us throughout. I would
			highly recommend him and company. Thanks Gary”
		</YpaText>
		<p class="text-primary">- Gordon Carey</p>
		<a href="https://www.trustpilot.com/review/www.yourpropertyabroad.com" target="_blank">
			<p class="text-primary underline">Source: Trustpilot</p>
		</a>
	</div>
</div>
