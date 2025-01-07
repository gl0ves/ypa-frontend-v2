<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const params = $derived(page.url.searchParams);

	let { count }: { count: number } = $props();

	const perPage = 18;
	const currentPage = $derived(parseInt(page.url.searchParams.get('page') || '1', 10));

	const navigate = async (page: number) => {
		const newParams = new URLSearchParams(params);
		newParams.set('page', page.toString());
		return goto(`?${newParams.toString()}`, { keepFocus: true });
	};
</script>

<Pagination.Root onPageChange={navigate} {count} {perPage}>
	{#snippet children({ pages })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item isVisible={currentPage === page.value}>
						<Pagination.Link
							disabled={currentPage === page.value}
							{page}
							isActive={currentPage === page.value}
						>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
