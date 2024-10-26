<script lang="ts">
	import IconChevronLeft from '~icons/mdi/chevron-left';
	import IconChevronRight from '~icons/mdi/chevron-right';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const params = $page.url.searchParams;

	let { count }: { count: number } = $props();

	const perPage = 18;
	const currentPage = $derived(parseInt($page.url.searchParams.get('page') || '1', 10));
	const totalPages = $derived(Math.max(1, Math.ceil(count / perPage)));

	const navigate = async (page: number) => {
		params.set('page', page.toString());
		return goto(`?${params.toString()}`, { keepFocus: true });
	};

	const next = async () => {
		const nextPage = Math.min(currentPage + 1, totalPages);
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

{#if count > 0}
	<Pagination.Root class="sticky bottom-0 z-50 bg-white py-2 border-t" {count} {perPage} let:pages>
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
				<Pagination.NextButton on:click={next} disabled={currentPage >= totalPages}>
					<span class="hidden sm:block">Next</span>
					<IconChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
{/if}
