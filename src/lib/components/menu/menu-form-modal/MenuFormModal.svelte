<script lang="ts">
	import type { Category } from '$lib/types/category';
	import type { Menu } from '$lib/types/menu';
	import { Button, Fileupload, Img, Input, Label, Modal, Select, Textarea } from 'flowbite-svelte';

	export let mode: 'create' | 'edit' = 'create';
	export let menu: Menu | undefined = undefined;
	export let categories: Category[];
	export let openModal = false;
	export let onSubmit: (data: Menu) => void;

	$: isCreate = mode === 'create';

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
			id: menu?.id || '',
			name,
			description,
			price,
			categoryId,
			image: '',
			active: menu?.active || false
		});

		openModal = false;
	};
</script>

<Modal
	title="{isCreate ? 'Add' : 'Edit'} Product"
	bind:open={openModal}
	outsideclose
	size="sm"
	class="min-w-full"
>
	<form on:submit={handleSubmit} id="menu-form" class="mb-4 grid gap-4">
		<div class="flex items-center gap-2">
			<Label class="min-w-24" for="name">Name</Label>
			<Input
				id="name"
				name="name"
				value={menu?.name || ''}
				type="text"
				placeholder="Product name"
				required
			/>
		</div>

		<div class="flex gap-2">
			<Label class="min-w-24" for="description">Description</Label>
			<Textarea
				id="description"
				name="description"
				value={menu?.description}
				placeholder="Your description here"
				rows="4"
				required
			/>
		</div>

		<div class="flex items-center gap-2">
			<Label class="min-w-24" for="price">Price</Label>
			<Input
				id="price"
				name="price"
				value={menu?.price}
				type="text"
				placeholder="100.00"
				required
			/>
		</div>

		<div class="flex items-center gap-2">
			<Label class="min-w-24" for="categoryId">Category</Label>
			<Select
				id="categoryId"
				name="categoryId"
				value={menu?.categoryId}
				items={categories.map((category) => ({
					name: category.name,
					value: category.id
				}))}
				required
			/>
		</div>

		<div class="flex gap-2" class:items-center={!menu?.image}>
			<Label class="min-w-24" for="image">Image</Label>
			{#if menu?.image}
				<Img src={menu?.image} alt={menu?.name} size="w-40" class="rounded-lg" />
			{:else}
				<Fileupload />
			{/if}
		</div>
	</form>

	<div slot="footer" class="flex w-full gap-2">
		<Button type="submit" form="menu-form">
			{#if isCreate}Add new{:else}Edit{/if} product
		</Button>
		<Button color="alternative" on:click={handleCancel}>Cancel</Button>
	</div>
</Modal>
