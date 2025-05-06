<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import RelatedListings from '$lib/components/RelatedListings.svelte';

	let { data } = $props();
</script>

<Layout maxWidth="lg">
	<div class="mb-5 mt-5 container">
		<div class:container--centered={data.blog.category === 'directory'}>
			<img class="image w-full" src={data.blog.cover} alt="Cover" />
		</div>

		<div>
			<YpaText size="lg" weight="semibold">{data.blog.title}</YpaText>
			<div class="details-container">
				{#if data.blog.published_when && data.blog.category !== 'directory'}
					<div class="detail">{data.blog.published_when}</div>
				{/if}
				{#if data.blog.author && data.blog.category !== 'directory'}
					<div class="detail">{data.blog.author}</div>
				{/if}
			</div>
		</div>
		<div class="blog-content">
			{@html data.blog.html}
		</div>
	</div>

	<RelatedListings
		relatedListings={data.blog.related_listings}
		propertyRegionOptions={data.options.propertyRegionOptions}
	/>
</Layout>

<style lang="scss" scoped>
	$paragraph-size: 20px;
	$paragraph-color: #424242;

	.blog-content {
		:global(p) {
			font-size: $paragraph-size;
			color: $paragraph-color;
			margin-bottom: 1em;
		}
		:global(li) {
			font-size: $paragraph-size;
			color: $paragraph-color;
			margin-bottom: 1em;
		}
		:global(ul) {
			margin-bottom: 20px;
		}
		:global(h1) {
			color: #004988;
			font-size: 36px;
			margin-bottom: 20px;
			line-height: 1.2;
		}
		:global(h2) {
			color: #004988;
			font-size: 32px;
			margin-bottom: 20px;
			line-height: 1.2;
		}
		:global(h3) {
			color: #004988;
			font-size: 28px;
			margin-bottom: 20px;
			line-height: 1.2;
		}
		:global(h4) {
			color: #004988;
			font-size: 24px;
			margin-bottom: 20px;
			line-height: 1.2;
		}
		:global(h5) {
			color: #004988;
			font-size: 20px;
			margin-bottom: 20px;
			line-height: 1.2;
		}
		:global(h6) {
			color: #004988;
			font-size: 16px;
			margin-bottom: 20px;
			line-height: 1.2;
		}

		:global(img) {
			margin-bottom: 2em;
		}
	}

	.image {
		margin-bottom: 30px;
	}

	.container {
		max-width: 52em;
		width: 100%;
		&--centered {
			display: flex;
			justify-content: center;
		}
	}

	.related-container {
		max-width: 80%;
		&--mobile {
			max-width: 100%;
		}
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.details-container {
		display: flex;
		margin-bottom: 20px;
		&--footer {
			margin: 0;
		}
		.detail {
			background-color: #004988;
			color: white;
			font-weight: 600;
			padding: 0.35em;
			margin: 0 0.2em 0 0;
		}
	}
</style>
