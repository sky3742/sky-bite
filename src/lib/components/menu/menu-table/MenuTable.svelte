<script lang="ts">
	import type { Menu } from '$lib/types/menu';
	import {
		Button,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Toggle
	} from 'flowbite-svelte';
	import { EditOutline, PlusOutline, TrashBinOutline } from 'flowbite-svelte-icons';

	export let menu: Menu[] = [];
	export let onCreate: () => void;
	export let onEdit: (item: Menu) => void;
	export let onDelete: (item: Menu) => void;
	export let onToggle: (item: Menu) => void;

	let searchValue = '';

	$: filteredMenu = menu.filter((item) => {
		return item.name.toLowerCase().includes(searchValue.toLowerCase());
	});
</script>

<div class="max-w-full overflow-auto">
	<TableSearch
		innerDivClass="flex p-4 justify-between items-center"
		searchClass="relative"
		bind:inputValue={searchValue}
	>
		<Button class="flex gap-2" slot="header" on:click={onCreate}>
			<PlusOutline />
			Add product
		</Button>

		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>Price</TableHeadCell>
			<TableHeadCell>Options</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each filteredMenu as item}
				<TableBodyRow>
					<TableBodyCell class="max-w-xs overflow-clip text-wrap">
						{item.name}
					</TableBodyCell>
					<TableBodyCell class="max-w-sm overflow-clip text-wrap">
						{item.description}
					</TableBodyCell>
					<TableBodyCell class="w-0">{item.price.toFixed(2)}</TableBodyCell>
					<TableBodyCell class="w-0">
						<div class="flex items-center">
							<Toggle
								bind:checked={item.active}
								on:change={() => {
									onToggle({ ...item });
								}}
							/>
							<Button
								color="none"
								outline
								class="border-none"
								size="xs"
								on:click={() => onEdit({ ...item })}
							>
								<EditOutline ariaLabel="Edit" />
							</Button>
							<Button
								color="red"
								outline
								class="border-none"
								size="xs"
								on:click={() => onDelete({ ...item })}
							>
								<TrashBinOutline ariaLabel="Delete" />
							</Button>
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
