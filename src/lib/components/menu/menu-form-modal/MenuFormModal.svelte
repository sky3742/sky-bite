<script lang="ts">
	import type { Category } from '$lib/types/category';
	import type { Menu } from '$lib/types/menu';
	import { faker } from '@faker-js/faker';

	let {
		mode = 'create' as const,
		menu = undefined,
		categories,
		openModal = $bindable(false),
		onSubmit
	}: {
		mode?: 'create' | 'edit';
		menu?: Menu | undefined;
		categories: Category[];
		openModal?: boolean;
		onSubmit: (data: Menu) => void;
	} = $props();

	let isCreate = $derived(mode === 'create');

	const handleCancel = () => {
		openModal = false;
	};

	const handleSubmit = (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = Number(formData.get('price') as string);
		const categoryId = formData.get('categoryId') as string;

		onSubmit?.({
			id: menu?.id || faker.string.uuid(),
			name,
			description,
			price,
			categoryId,
			image: menu?.image || faker.image.url(),
			active: menu?.active ?? false
		});

		openModal = false;
	};

	function stopProp(e: Event) {
		e.stopPropagation();
	}
</script>

{#if openModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4"
		onclick={() => (openModal = false)}
		onkeydown={(e) => {
			if (e.key === 'Escape') openModal = false;
		}}
		role="presentation"
	>
		<div
			class="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
			onclick={stopProp}
			onkeydown={stopProp}
			role="presentation"
		>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				{isCreate ? 'Add' : 'Edit'} Product
			</h3>

			<form onsubmit={handleSubmit} id="menu-form" class="mt-4 grid gap-4">
				<div class="flex items-center gap-2">
					<label for="name" class="min-w-24 text-sm font-medium text-gray-900 dark:text-white"
						>Name</label
					>
					<input
						id="name"
						name="name"
						value={menu?.name || ''}
						type="text"
						placeholder="Product name"
						required
						class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					/>
				</div>
				<div class="flex gap-2">
					<label
						for="description"
						class="min-w-24 text-sm font-medium text-gray-900 dark:text-white">Description</label
					>
					<textarea
						id="description"
						name="description"
						value={menu?.description}
						placeholder="Your description here"
						rows={4}
						required
						class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					></textarea>
				</div>
				<div class="flex items-center gap-2">
					<label for="price" class="min-w-24 text-sm font-medium text-gray-900 dark:text-white"
						>Price</label
					>
					<input
						id="price"
						name="price"
						value={menu?.price}
						type="number"
						step="0.01"
						placeholder="100.00"
						required
						class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					/>
				</div>
				<div class="flex items-center gap-2">
					<label for="categoryId" class="min-w-24 text-sm font-medium text-gray-900 dark:text-white"
						>Category</label
					>
					<select
						id="categoryId"
						name="categoryId"
						required
						class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					>
						{#each categories as cat (cat.id)}
							<option value={cat.id} selected={cat.id === menu?.categoryId}>{cat.name}</option>
						{/each}
					</select>
				</div>
			</form>

			<div class="mt-6 flex gap-2">
				<button
					type="submit"
					form="menu-form"
					class="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					{isCreate ? 'Add new' : 'Edit'} product
				</button>
				<button
					type="button"
					onclick={handleCancel}
					class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
