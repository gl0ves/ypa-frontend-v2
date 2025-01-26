<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import { type Block } from '$lib/ypaTypes.js';
	import RelatedListings from '$lib/components/RelatedListings.svelte';

	let { data } = $props();

	const getIf = (item: Block, type: string) => item.type === type;
	const getIfLevel = (item: Block, level: number) => item.data.level === level;
	const getIfList = (item: Block, type: string) => item.data.style === type;
</script>

<Layout maxWidth="lg">
	<div class="mb-5 mt-5 container">
		<div class:container--centered={data.blog.category === 'directory'}>
			<img
				class="image"
				src={data.blog.cover}
				alt="Cover"
				style:max-width={data.blog.category === 'blog' ? '1920px' : '350px'}
			/>
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

		{#each data.blog.content.blocks as item}
			{#if getIf(item, 'header')}
				{#if getIfLevel(item, 1)}
					<h1 class="font-bold">{item.data.text}</h1>
				{:else if getIfLevel(item, 2)}
					<h2 class="font-semibold">{item.data.text}</h2>
				{:else if getIfLevel(item, 3)}
					<h3 class="font-semibold">{item.data.text}</h3>
				{:else if getIfLevel(item, 4)}
					<h4>{item.data.text}</h4>
				{:else if getIfLevel(item, 5)}
					<h5>{item.data.text}</h5>
				{:else if getIfLevel(item, 6)}
					<h6>{item.data.text}</h6>
				{/if}
			{/if}
			{#if getIf(item, 'paragraph')}
				<p class="mb-6">{@html item.data.text}</p>
			{/if}
			{#if getIf(item, 'list')}
				{#if getIfList(item, 'ordered')}
					<ol>
						{#if item.data.items}
							{#each item.data.items as listItem}
								<li class="list-item">{@html listItem}</li>
							{/each}
						{/if}
					</ol>
				{:else if getIfList(item, 'unordered')}
					<ul>
						{#if item.data.items}
							{#each item.data.items as listItem}
								<li class="list-item">{@html listItem}</li>
							{/each}
						{/if}
					</ul>
				{/if}
			{/if}
			{#if item.data.file && item.data.file.href}
				<a href={item.data.file.href} target="_blank">
					<img class="image" alt={item.data.file.alt} src={item.data.file.url} />
				</a>
			{:else if getIf(item, 'image')}
				<img class="image" alt={item.data.file?.alt} src={item.data.file?.url} />
			{/if}
		{/each}
	</div>

	<RelatedListings
		relatedListings={data.blog.related_listings}
		propertyRegionOptions={data.options.propertyRegionOptions}
	/>

	<!-- TODO: Social share -->
	<!-- TODO: Related listings -->
</Layout>

<style lang="scss" scoped>
	$paragraph-size: 20px;
	$paragraph-color: #111111;
	p {
		font-size: $paragraph-size;
		color: $paragraph-color;
	}
	li {
		font-size: $paragraph-size;
		color: $paragraph-color;
		margin-bottom: 1em;
	}
	ul {
		margin-bottom: 20px;
	}
	h1 {
		color: #004988;
		font-size: 36px;
		margin-bottom: 20px;
		line-height: 1.2;
	}
	h2 {
		color: #004988;
		font-size: 32px;
		margin-bottom: 20px;
		line-height: 1.2;
	}
	h3 {
		color: #004988;
		font-size: 28px;
		margin-bottom: 20px;
		line-height: 1.2;
	}
	h4 {
		color: #004988;
		font-size: 24px;
		margin-bottom: 20px;
		line-height: 1.2;
	}
	h5 {
		color: #004988;
		font-size: 20px;
		margin-bottom: 20px;
		line-height: 1.2;
	}
	h6 {
		color: #004988;
		font-size: 16px;
		margin-bottom: 20px;
		line-height: 1.2;
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
		&.property-container {
			max-width: 0;
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
