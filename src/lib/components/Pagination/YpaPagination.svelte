<script lang="ts">
	import IconChevronLeft from '~icons/mdi/chevron-left';
	import IconChevronRight from '~icons/mdi/chevron-right';
	import { mediaQuery } from 'svelte-legos';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const isDesktop = mediaQuery('(min-width: 768px)');

	export let count: number;

	$: perPage = 18;
	$: siblingCount = $isDesktop ? 1 : 0;
	$: currentPage = parseInt($page.url.searchParams.get('page') || '1', 10);

	const navigate = async (page: number) => {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', page.toString());
		return goto(`?${params.toString()}`, { keepFocus: true });
	};

	const next = async () => {
		const nextPage = Math.min(currentPage + 1, Math.ceil(count / perPage));
		if (nextPage !== currentPage) {
			await navigate(nextPage);
		}
	};

	const prev = async () => {
		const prevPage = Math.max(currentPage - 1, 1);
		if (prevPage !== currentPage) {
			await navigate(prevPage);
		}
	};
</script>

<Pagination.Root
	class="sticky bottom-0 z-50 bg-white py-2 border-t"
	{count}
	{perPage}
	{siblingCount}
	let:pages
>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton on:click={prev} disabled={currentPage <= 1}>
				<IconChevronLeft class="h-4 w-4" />
				<span class="hidden sm:block">Previous</span>
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link
						on:click={() => navigate(page.value)}
						{page}
						isActive={currentPage === page.value}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton on:click={next} disabled={currentPage >= Math.ceil(count / perPage)}>
				<span class="hidden sm:block">Next</span>
				<IconChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
