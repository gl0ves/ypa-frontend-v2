<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import { type Snippet } from 'svelte';
	const { children, color = 'blue' }: { children: Snippet; color?: 'blue' | 'white' } = $props();
	const fallback = () => {
		return 'Terms and Conditions';
	};

	const colorClasses = {
		blue: 'text-blue',
		white: 'text-white'
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class="text-left">
		<span class={`${colorClasses[color]} cursor-pointer`}>
			{@render (children ?? fallback)()}
		</span>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-[80vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title
				><YpaText size="md" weight="semibold" color="primary">Terms and Condition</YpaText
				></Dialog.Title
			>
		</Dialog.Header>
		<div>
			<p class="mb-2">
				Your Property Abroad is a property finding service, located at the Keizersgracht 520H 1017EK
				Amsterdam, registered with the Dutch Chamber of Commerce under number 71011366, registered
				with the Dutch Tax Office under VAT number NL507822614B01. Our website is <a
					href="https://www.yourpropertyabroad.com/">https://www.yourpropertyabroad.com/</a
				>. These general terms and conditions set out the terms under which we provide our services
				to you.
			</p>

			<h2 class="font-bold mb-2">Article 1: Definitions</h2>
			<p class="mb-2">
				A number of terms is used repeatedly in these terms and conditions. They will have the
				following meaning:
			</p>
			<ul>
				<li class="mb-2">
					<strong>Service:</strong> any services provided to you by us with regard to finding a property
					abroad;
				</li>
				<li class="mb-2"><strong>Property:</strong> any land or real estate offered for sale;</li>
				<li class="mb-2">
					<strong>Seller:</strong> the person or company that is selling a property;
				</li>
				<li class="mb-2">
					<strong>Real estate agent responsible for the sale:</strong> the agent enlisted by the seller
					for the sale of the property.
				</li>
			</ul>
			<p class="mb-2">
				All references in these terms and conditions to the singular shall include the plural and
				vice versa.
			</p>

			<h2 class="font-bold mb-2">Article 2: Applicability</h2>
			<p class="mb-2">
				These terms and conditions set out all of the rules and obligations that apply to your use
				of our services.
			</p>
			<ul>
				<li class="mb-2">The applicability of your (general) terms and conditions is excluded.</li>
				<li class="mb-2">
					We may, at any time, and at our sole discretion, change or supplement these terms and
					conditions. Any such change will be effective immediately upon posting on our website. Any
					material changes to the terms and conditions shall be communicated to you prior to the
					change. Your continued use of our services following any such change constitutes your
					acceptance of these new terms and conditions.
				</li>
			</ul>

			<h2 class="font-bold mb-2">Article 3: Scope of services</h2>
			<p class="mb-2">
				We do not sell properties. Our services consist of finding a property abroad that matches
				your wishes and budget and bringing you in contact with the real estate agent responsible
				for the sale of that property.
			</p>
			<ul>
				<li class="mb-2">
					We shall not be a party to any contract or agreement you enter into with a seller or real
					estate agent responsible for the sale.
				</li>
				<li class="mb-2">
					We provide our services free of charge to you. If you buy a property or use a third party
					service after a referral by us, the real estate agent responsible for the sale of that
					property or the third party will pay us a commission.
				</li>
				<li class="mb-2">
					Our services are non-obligatory and we reserve the right to terminate the provision of our
					services at any time, without having to specify the reasons for this and without being
					bound to pay any compensation to you or a third party.
				</li>
			</ul>

			<h2 class="font-bold mb-2">Article 4: Services</h2>
			<p class="mb-2">
				To enlist our services, you can contact us by phone or through our website.
			</p>
			<ul>
				<li class="mb-2">
					After you confirm your subscription to our services we will contact you to make an
					inventory of your wishes and budget and will email you property options until you find a
					possible match.
				</li>
				<li class="mb-2">
					You are obligated to inform us of any changes in your contact details, wishes and budget
					that may affect our search for a possible match.
				</li>
				<li class="mb-2">
					You are obligated to inform us immediately if you wish to discontinue the use of our
					services.
				</li>
				<li class="mb-2">
					In case there is a match we will bring you into contact with the real estate agent
					responsible for the sale.
				</li>
				<li class="mb-2">
					Optionally and at your request we can bring you into contact with other parties that can
					help you with your purchase, such as, but not limited to, currency exchange companies.
				</li>
				<li class="mb-2">
					We reserve the right to not accept your registration for our services on a permanent or
					temporary basis at our sole discretion.
				</li>
			</ul>

			<h2 class="font-bold mb-2">Article 5: Data sharing</h2>
			<p class="mb-2">
				We will process your personal data in accordance with our privacy statement.
			</p>
			<ul>
				<li class="mb-2">
					If you are interested in a particular property and wish to receive more information about
					it, we will share your contact details with the real estate agent responsible for the sale
					of that property in order for him or her to contact you.
				</li>
				<li class="mb-2">
					If you request us to bring you into contact with any of the third parties as mentioned in
					article 4 paragraph 6, we will share your contact details with that third party.
				</li>
			</ul>

			<h2 class="font-bold mb-2">Article 6: Guarantees</h2>
			<p class="mb-2">
				We do not guarantee that we will find a property for you that will match your wishes and
				budget.
			</p>
			<ul>
				<li class="mb-2">
					The details of the properties we inform you about are provided to us by third parties and
					therefore we cannot guarantee their accuracy or completeness. Any reliance on these
					details is at your own risk. We recommend that you check all property details with the
					real estate agent responsible for the sale or the seller before making any decisions or
					taking any action pertaining to a property we have informed you about.
				</li>
				<li class="mb-2">
					We strive to keep our information with regard to the properties up to date, but we do not
					guarantee that a property we inform you about is still available.
				</li>
			</ul>

			<h2 class="font-bold mb-2">Article 7: Liability</h2>
			<p class="mb-2">
				With the exception of cases of deliberate acts or conscious recklessness on our part, we
				shall not be liable for any damages arising from the use of our services, unless this
				limitation of liability would be unlawful. In such case our liability for damages shall be
				limited to € 250 per event. For this purpose, interrelated events will be treated as a
				single event.
			</p>
			<ul>
				<li class="mb-2">
					Liability for indirect damage, including consequential loss, lost profit, missed savings
					or damage due to business interruption, is excluded.
				</li>
				<li class="mb-2">
					Our liability lapses after one year from the moment the damages occurred or reasonably
					should have been discovered by you.
				</li>
				<li class="mb-2">
					We are not liable for the information provided on our website nor for the availability of
					our website or any of our services.
				</li>
				<li class="mb-2">
					Any liability cannot be attributed to us if it is due to force majeure.
				</li>
			</ul>

			<h2 class="font-bold mb-2">Article 8: Applicable law and competent court</h2>
			<p class="mb-2">These general terms and conditions are governed by Dutch law.</p>
			<p class="mb-2">
				In the event of a dispute, we will make every effort to settle the dispute in mutual
				consultation with you. If this fails, the dispute shall be submitted to the competent court
				at the Amsterdam District Court.
			</p>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="reset">Close</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
