<script>
	import { Navbar, Sidebar } from '$lib/components/layout';
</script>

<div class="flex bg-gray-50 antialiased dark:bg-gray-900">
	<div class="relative">
		<Sidebar />
	</div>

	<div class="flex max-h-screen w-full flex-col">
		<Navbar />

		<main class="h-auto overflow-auto p-4">
			<slot />
		</main>
	</div>
</div>
