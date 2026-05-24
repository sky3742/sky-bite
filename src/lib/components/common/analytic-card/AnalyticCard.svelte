<script lang="ts">
	let {
		label = 'New Orders',
		value = 23,
		icon
	}: {
		label?: string;
		value?: number | string;
		icon?: import('svelte').Snippet;
	} = $props();
</script>

<div
	class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
>
	<div class="flex items-center justify-between">
		<p class="text-sm font-bold text-gray-500 dark:text-gray-400">{label}</p>
		{#if icon}
			{@render icon()}
		{:else}
			<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
				/>
			</svg>
		{/if}
	</div>
	<p class="mt-2 text-4xl font-semibold text-gray-900 dark:text-white">{value}</p>
</div>
