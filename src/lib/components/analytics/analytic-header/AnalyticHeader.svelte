<script lang="ts">
	export let title = '';
	export let value = '';
</script>

<div class="mb-4 flex justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
	<div class="flex items-center">
		<div
			class="me-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
		>
			<slot name="icon" class="h-6 w-6 text-gray-500 dark:text-gray-400" />
		</div>
		<div>
			<h5 class="pb-1 text-2xl font-bold leading-none text-gray-900 dark:text-white">{value}</h5>
			<p class="text-sm font-normal text-gray-500 dark:text-gray-400">{title}</p>
		</div>
	</div>
	<!-- <div>
		<span
			class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
		>
			<ArrowUpOutline class="me-1.5 h-2.5 w-2.5" />
			42.5%
		</span>
	</div> -->
</div>
