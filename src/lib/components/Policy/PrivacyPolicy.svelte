<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import YpaText from '../ui/text/YpaText.svelte';

	let { color = 'blue' }: { color?: 'blue' | 'white' } = $props();

	const colorClasses = {
		blue: 'text-blue',
		white: 'text-white'
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class="text-left">
		<span class={`${colorClasses[color]}`}
			><YpaText size="sm" weight="semibold" color="white">View Privacy Policy</YpaText></span
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title><YpaText size="md" weight="semibold">Privacy Statement</YpaText></Dialog.Title>
		</Dialog.Header>
		<Dialog.Description class="max-h-[80vh] overflow-y-auto text-gray-800">
			<p class="font-bold">
				Your right to privacy is important to us. Your Property Abroad handles your personal data
				carefully.
			</p>
			<p class="mt-4">
				In this privacy statement we would like to inform you about what personal data is collected
				by us, what we do with it and what your rights are in this regard.
			</p>
			<h3 class=" font-semibold mt-6">About Your Property Abroad</h3>
			<p class="mt-2">
				Your Property Abroad is a property finding service. Below are our contact details.
			</p>
			<ul class="list-disc list-inside mt-2 space-y-2">
				<li><strong>Address: Keizersgracht 520H 1017EK Amsterdam, The Netherlands</strong></li>
				<li><strong>Website: https://www.yourpropertyabroad.com/</strong></li>
				<li><strong>E-mail: info@yourpropertyabroad.com</strong></li>
				<li><strong>Phone number: +31 6 18 47 24 80</strong></li>
				<li><strong>Facebook.com /yourpropertyabroad/</strong></li>
				<li><strong>Linkedin.com /company/your-property-abroad/</strong></li>
				<li><strong>Instagram.com /yourpropertyabroad/</strong></li>
				<li><strong>Chamber of Commerce 71011366</strong></li>
				<li><strong>VAT number NL507822614B01</strong></li>
			</ul>
			<h3 class=" font-semibold mt-6">Your personal data</h3>
			<p class="mt-2">
				In the performance of our services we collect and process certain personal data. Below is an
				overview of which personal data are collected and processed by Your Property Abroad:
			</p>
			<ul class="list-disc list-inside mt-2 space-y-2">
				<li><strong>Your name</strong></li>
				<li><strong>Your e-mail address</strong></li>
				<li><strong>Your phone number</strong></li>
				<li><strong>Your location</strong></li>
				<li><strong>Your IP address</strong></li>
				<li><strong>Your budget for a property</strong></li>
				<li>
					<strong
						>Personal information that you share with us voluntarily and on your own initiative</strong
					>
				</li>
			</ul>
			<p class="mt-4">
				We receive this information directly from you through our website, through the application
				form for our groups on Facebook or from Your Choice Property Ltd, located in Ireland.
				However, if you are looking for a property together with a partner, friend or family member,
				we may receive your contact information from them if they provide it to us on their own
				initiative.
			</p>
			<p class="mt-2">
				If you are a seller of a property, we may receive your personal data from your estate agent
				for billing purposes.
			</p>
			<h3 class="text-xl font-semibold mt-6">Consequences of not providing personal data</h3>
			<p class="mt-2">
				You are not (legally) obliged to provide your personal information to us. However, if you do
				not provide the necessary personal information, some of the services below simply cannot be
				performed.
			</p>
			<h3 class="text-xl font-semibold mt-6">Purposes of processing personal data</h3>
			<p class="mt-2">
				We always have a reason for processing your personal data. Below is an overview of the
				purposes for which Your Property Abroad can collect and process personal data:
			</p>
			<ul class="list-disc list-inside mt-2 space-y-2">
				<li><strong>Performance of our services to you</strong></li>
				<li><strong>Contacting you (at your request)</strong></li>
				<li><strong>Marketing activities</strong></li>
				<li><strong>Sending a newsletter you subscribed to</strong></li>
				<li><strong>Analyzing the use of our website and the types of visitors</strong></li>
				<li>
					<strong
						>Verifying your identity when you exercise your rights under the applicable privacy
						legislation</strong
					>
				</li>
				<li>
					<strong
						>Demanding proper fulfillment of your duties under an agreement with us if you fail to
						do so</strong
					>
				</li>
			</ul>
			<h3 class="text-xl font-semibold mt-6">Grounds for processing</h3>
			<p class="mt-2">
				If personal data is processed, this must be done on a ground provided for by the law. Your
				Property Abroad processes personal data on the following grounds:
			</p>
			<ul class="list-disc list-inside mt-2 space-y-2">
				<li><strong>It is necessary for the performance of our services</strong></li>
				<li><strong>You have given consent for the processing</strong></li>
				<li><strong>The law requires us to process the personal data</strong></li>
				<li>
					<strong>We have a legitimate interest in processing of your personal data</strong>
				</li>
			</ul>
			<h3 class="text-xl font-semibold mt-6">Processing on the grounds of legitimate interest</h3>
			<h4 class="text-lg font-semibold mt-4"><em>1. Marketing</em></h4>
			<p class="mt-2">
				After providing our services to you, we can approach you with an offer of similar services.
				In this way Your Property Abroad can grow and increase its brand awareness and market share.
				The use of your personal data for this purpose is limited and you always have the right to
				object to such marketing activities. If you do so, we will immediately cease any such
				activities.
			</p>
			<h4 class="text-lg font-semibold mt-4"><em>2. Claims</em></h4>
			<p class="mt-2">
				We may use your personal data to detect fraud, failure to fulfil any duties under an
				agreement with us, to report the aforementioned, to pass on a claim for collection or to
				conduct a lawsuit. In such cases, we may need certain personal data, such as name and
				address, to start these processes. If we would not have the right to use your personal data
				for such purposes, it would result in us not being able to demand performance of an
				agreement, which could put our business at risk.
			</p>
			<p class="mt-2">
				When personal data are processed on the basis of legitimate interest, you have the right to
				object to this. You can do this by contacting us via the contact details above. In such case
				we will weigh your interest against ours and reassess whether your interest outweighs ours.
			</p>
			<h4 class="text-lg font-semibold mt-4"><strong>3. Newsletter</strong></h4>
			<p class="mt-2">
				If you subscribe to our newsletter you authorize us to use your e-mail address for that
				purpose. You can unsubscribe from the newsletter at any time.
			</p>
			<h3 class=" font-semibold mt-6">Disclosure of personal data</h3>
			<p class="mt-2">
				If you leave a publicly accessible review about us on Trustpilot, we can copy that review to
				our website. We will add your (first) name to the aforementioned review. This information
				can be included in search engine results. You always have the right to object to this kind
				of processing. In that case we will remove your review immediately from our website.
			</p>
			<h3 class=" font-semibold mt-6">Cookies</h3>
			<p class="mt-2">
				Cookies are small text files that are placed on your computer through your browser. Your
				Property Abroad uses cookies to make our website function properly, to receive insight on
				the use of our website and to make relevant offers to you after you leave our website.
			</p>
			<h3 class="text-xl font-semibold mt-4"><em>Google Analytics</em></h3>
			<p class="mt-2">
				In order to gain insight into the statistics on the use of our website and to draw up
				reports, we use Google Analytics, which is part of the American corporation Google Inc.
				Google Analytics places analytical cookies for this purpose. We have set up Google Analytics
				as privacy-friendly as possible.
			</p>
			<p class="mt-2">
				This means, among other things, that Google Analytics does not process your entire IP
				address and does not share your data with (other services of) Google.
			</p>
			<h3 class="text-xl font-semibold mt-4"><em>Social media</em></h3>
			<p class="mt-2">
				Our website contains social media buttons. By using these social media, you may share your
				data with the relevant social medium and cookies may be placed by this party in your
				browser. If you want to know what these third parties do with your data, we advise you to
				review their privacy policy. This can usually be found on their own website. Some of these
				parties store personal data outside of the European Union.
			</p>
			<h3 class="text-xl font-semibold mt-4"><em>Video</em></h3>
			<p class="mt-2">
				We may offer videos on our website, for example via embedded YouTube and Vimeo videos. These
				parties can register information about you, for example when you play the video. If you want
				to know what these third parties do with your data, we advise you to review their privacy
				policy. This can usually be found on their own website. These parties may store personal
				data outside of the European Union.
			</p>
			<h3 class="text-xl font-semibold mt-4"><em>Tracking cookies</em></h3>
			<p class="mt-2">
				Tracking cookies can follow your surfing behavior on our website, but also your behavior
				when you leave our website. This allows for personalized online advertisements and
				customized content to be shown to you based on your surfing habits. We ask for your consent
				to place these cookies.
			</p>
			<h3 class=" font-semibold mt-6">Sharing with third parties</h3>
			<p class="mt-2">
				We share your personal data with third parties if this is necessary for the performance of
				our services, if you request us to do so and to comply with any legal obligations. These
				third parties are in any case:
			</p>
			<ul class="list-disc list-inside mt-2 space-y-2">
				<li><strong>Our hosting provider, who has the website on his server</strong></li>
				<li>
					<strong>The party that presents us with the statistics on the use of our website</strong>
				</li>
				<li><strong>The party that performs our marketing activities</strong></li>
				<li>
					<strong>The party that provides our customer relationship management system</strong>
				</li>
				<li>
					<strong
						>The party performing escrow services with regard to our commission if you purchase a
						property</strong
					>
				</li>
				<li><strong>The party whose services we use to send our newsletter</strong></li>
				<li>
					<strong
						>The payment service provider and the bank that provides the payments via the website</strong
					>
				</li>
				<li><strong>The party that we may use to collect a claim</strong></li>
			</ul>
			<p class="mt-4">
				If you have shown interest in a property we will share your contact details with the estate
				agent and seller of the property. After we have shared your contact details with them, they
				become responsible for those details. They will use the data in accordance with their own
				privacy policy. We will provide you with their name and contact details so that you can
				contact them with any questions.
			</p>
			<h3 class=" font-semibold mt-6">Retention period</h3>
			<p class="mt-2">
				We retain your personal data for as long as necessary to provide our services to you. After
				the service has ended, your personal data will be kept for 36 months. This is due to the
				nature of our services.
			</p>
			<p class="mt-2">
				You may, for instance, need information on the services provided to you by us or wish us to
				perform additional services. Personal data is also stored in case a complaint or dispute
				arises about the services provided.
			</p>
			<p class="mt-2">
				An exception to the storage period mentioned above is personal data on invoices. We are
				required by law to keep our invoices for seven years. When personal data is collected on the
				basis of your consent, the personal data will be stored for a maximum of 3 months after you
				have withdrawn your consent.
			</p>
			<h3 class=" font-semibold mt-6">Security</h3>
			<p class="mt-2">
				We keep our website as safe as possible. Your connection to the website is encrypted using
				SSL (secure sockets layer) and can only be accessed through a HTTPS connection. In addition,
				the website is well maintained and regularly scanned for vulnerabilities to ensure proper
				security.
			</p>
			<h3 class=" font-semibold mt-6">Your rights</h3>
			<p class="mt-2">
				You have the right to view your personal details, to have them changed or removed. In
				addition, you have the right to limit the processing of your personal data, to have it
				transferred to you or a third party and to object to the processing of your personal data by
				Your Property Abroad.
			</p>
			<p class="mt-2">
				You can exercise your rights by contacting Your Property Abroad by telephone, e-mail or
				post. The contact details are at the top of this privacy statement. We ask that you attach a
				copy of your ID to your request, so that we can verify that we are providing the requested
				information to the right person. On the copy of your identity card we ask you to make your
				passport photo, machine readable zone and personal identification number permanently
				unreadable.
			</p>
			<h3 class="text-xl font-semibold mt-6">More information about your rights</h3>
			<p class="mt-2">
				You can find additional information for each of these rights on the website of the Dutch
				Data Protection Authority.
				<a
					href="https://autoriteitpersoonsgegevens.nl/"
					target="_blank"
					class="text-blue-500 underline"
					>Click here to go to the website of the Dutch Data Protection Authority</a
				>.
			</p>
			<h3 class="text-xl font-semibold mt-6">Withdrawing consent</h3>
			<p class="mt-2">
				When your personal data is processed on the basis of your consent, you always have the right
				to withdraw your consent by contacting us. The processing of this personal data is then
				stopped.
			</p>
			<p class="mt-2">However, the withdrawal of consent does not have retroactive effect.</p>
			<h3 class="text-xl font-semibold mt-6">Complaints</h3>
			<p class="mt-2">
				You have the right to file a complaint with the Dutch Data Protection Authority. You can
				read how to do this on the
				<a
					href="https://autoriteitpersoonsgegevens.nl/"
					target="_blank"
					class="text-blue-500 underline">Dutch Data Protection Authority’s website</a
				>.
			</p>
		</Dialog.Description>
		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="default">Close</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
