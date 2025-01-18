<script lang="ts">
	import YpaText from './ui/text/YpaText.svelte';

	const { region } = $props();
</script>

<div class="pt-2 pb-8">
	<YpaText size="md" weight="semibold">Find your dream property for sale in {region}</YpaText>
	<YpaText size="sm">
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
	<YpaText size="sm">
		<div class="mb-2">
			Are you looking to buy a permanent home or an investment property to rent out?
		</div>
	</YpaText>
	<YpaText size="sm">
		<div class="mb-2">
			If you’re interested in a property simply Whatsapp us by including the reference number, use
			the call back form or call us directly. We’re looking forward to hearing from you!
		</div>
	</YpaText>
</div>
