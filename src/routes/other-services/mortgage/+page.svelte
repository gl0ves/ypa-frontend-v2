<script lang="ts">
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import YpaTitle from '$lib/components/ui/text/YpaTitle.svelte';
	import MortgageForm from '$lib/components/MortgageForm.svelte';
</script>

<Layout maxWidth="sm">
	<div class="flex justify-center pt-12 mb-4">
		<img
			src="https://cdn.yourpropertyabroad.com/static/mortgage-direct-logo.jpg"
			alt="mortgage direct logo your property abroad partner"
			width="200px"
		/>
	</div>
	<div class="mb-4">
		<YpaTitle>Mortgages for Spanish Property Buyers: Apply for Mortgage Direct</YpaTitle>
	</div>
	<div class="mb-4">
		<YpaText size="sm">
			Will you need a mortgage to buy your dream property in Spain? The maximum amount you can
			borrow depends on whether or not you are a working resident in Spain, your age and of course
			your financial situation. Your local bank is rarely your best option, as mortgage brokers can
			get better rates due to the volume of clients they refer to the banks.
		</YpaText>
	</div>
	<div class="mb-4">
		<YpaText size="sm">
			<b>Your Property Abroad</b> partners with mortgage specialists <b>Mortgage Direct</b>; a
			leading independent mortgage broker in Spain since 2006. They offer a premium broker service
			to all nationalities, getting you the best deal possible.
		</YpaText>
	</div>
	<div class="mb-4">
		<YpaTitle>Introduction Video Mortgage Direct</YpaTitle>
	</div>
	<div class="flex justify-center flex-col items-center mb-4">
		<iframe
			title="Mortgage Direct Introduction"
			width="560"
			height="315"
			src="https://www.youtube.com/embed/ti-mc1p1oMU"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
		></iframe>
	</div>
	<div class="mb-4">
		<YpaText size="sm">
			<ul class="list-disc list-inside ml-4 space-y-2">
				<li class="text-gray-800 font-medium">Qualified Mortgage Advisors</li>
				<li class="text-gray-800 font-medium">
					Native English and Dutch-speaking brokers some of whom can also communicate in Spanish,
					Portuguese and German
				</li>
				<li class="text-gray-800 font-medium">Work with all lenders offering finance for Spain</li>
				<li class="text-gray-800 font-medium">Exclusive deals (see below)</li>
			</ul>
		</YpaText>
	</div>
	<div class="mb-4">
		<YpaText size="sm">
			<b
				>If you think you will be approved for a mortgage based on the above terms; Fill in your
				details and we’ll get a mortgage specialist to get back to you within 48 hours.</b
			>
		</YpaText>
	</div>
	<div class="flex justify-center pt-12 mb-4">
		<img
			src="https://cdn.yourpropertyabroad.com/static/mortgage-direct-logo.jpg"
			alt="mortgage direct logo your property abroad partner"
			width="200px"
		/>
	</div>
	<MortgageForm />
</Layout>
