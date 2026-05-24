<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="grid h-screen place-content-center bg-gray-50 px-4 dark:bg-gray-900">
	<div class="text-center">
		<h1 class="text-9xl font-black text-gray-200 dark:text-gray-700">{$page.status}</h1>

		{#if $page.status === 404}
			<p class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
				Something's missing.
			</p>
			<p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
				Sorry, we can't find that page. You'll find lots to explore on the home page.
			</p>
		{:else if $page.status === 500}
			<p class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
				Internal Server Error.
			</p>
			<p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
				We are already working to solve the problem.
			</p>
		{/if}

		<a
			href="/"
			class="mt-6 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			Back to Homepage
		</a>
	</div>
</div>
