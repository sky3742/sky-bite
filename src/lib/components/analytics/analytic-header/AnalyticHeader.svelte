<script lang="ts">
	let {
		title = '',
		value = '',
		icon
	}: {
		title?: string;
		value?: string;
		icon?: import('svelte').Snippet;
	} = $props();
</script>

<div class="mb-4 flex justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
	<div class="flex items-center">
		<div
			class="me-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
		>
			{#if icon}
				{@render icon()}
			{/if}
		</div>
		<div>
			<h5 class="pb-1 text-2xl font-bold leading-none text-gray-900 dark:text-white">{value}</h5>
			<p class="text-sm font-normal text-gray-500 dark:text-gray-400">{title}</p>
		</div>
	</div>
</div>
