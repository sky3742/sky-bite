<script lang="ts">
	import { UserMenu } from '$lib/components/common';
	import { NavBrand } from '..';
</script>

<nav
	class="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
>
	<div class="flex w-full items-center justify-between px-4 py-2 md:justify-end">
		<div class="pl-2 md:hidden">
			<NavBrand />
		</div>

		<div class="flex items-center gap-2">
			<UserMenu />
		</div>
	</div>
</nav>
