<script lang="ts">
	import LegalForm from '$lib/components/LegalForm.svelte';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';
</script>

<Layout maxWidth="sm">
	<div class="mb-5 mt-5">
		<div class="flex justify-center">
			<div>
				<YpaText weight="bold" size="lg"
					>Expert Legal Services in Spain from Lexidy Law Boutique</YpaText
				>
				<br />
				<YpaText size="sm">Do you need legal assistance when dealing with matters in Spain?</YpaText
				>
				<YpaText size="sm">
					<b>Your Property Abroad</b> partners with legal experts <b>Lexidy Law Boutique</b>; a
					boutique-style modern and dynamic English speaking law firm like no other, with offices in
					Spain and Portugal. They offer many legal services, such as Brexit, immigration and
					residency services, litigation, tax services or support when setting up a business in
					Spain.
				</YpaText>
				<br />
				<ul class="m-4 list-disc max-w-full">
					<li><YpaText size="sm">Expert Legal Advisors</YpaText></li>
					<li>
						<YpaText size="sm"
							>English speaking and can also communicate in Spanish and Portuguese.</YpaText
						>
					</li>
					<li><YpaText size="sm">Digital & Modern</YpaText></li>
					<li><YpaText size="sm">Brexit legal services</YpaText></li>
					<li><YpaText size="sm">Efficient & professional</YpaText></li>
					<li>
						<YpaText size="sm">Free initial consultation available</YpaText>
					</li>
					<li>
						<YpaText size="sm"
							>Prepared to support you even in the most complex legal matters</YpaText
						>
					</li>
					<li>
						<YpaText size="sm">Communicate in an easy to understand language</YpaText>
					</li>
				</ul>
				<br />
				<YpaText weight="semibold" size="md"
					>Submit your details below to get in touch with Lexidy:</YpaText
				>
			</div>
		</div>
		<div class="flex-col justify-center">
			<LegalForm />
			<br /><br />
			<div class="flex justify-center">
				<a href="/buyer-information/brexit-legal-guide-lexidy-law-boutique">
					<img
						src="https://cdn.yourpropertyabroad.com/static/og/article-images/uk-citizen-moving-to-spain-read-brexit-guide.png"
						alt="legal-experts-lexidy-law-boutique-guide-financial-legal-real-estate-taxes-business"
					/>
				</a>
			</div>
		</div>
	</div>
</Layout>
