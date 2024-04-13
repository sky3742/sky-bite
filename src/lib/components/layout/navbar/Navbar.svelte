<script lang="ts">
	import { AppsDropdown, NotificationDropdown, UserMenu } from '$lib/components/common';
	import { Navbar } from 'flowbite-svelte';
	import { NavBrand } from '..';
</script>

<Navbar
	let:NavContainer
	class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
>
	<NavContainer class="flex w-full justify-between md:justify-end">
		<div class="pl-2 md:hidden">
			<NavBrand />
		</div>

		<!-- <div class="hidden md:inline-block">
			<Breadcrumb />
		</div> -->

		<div class="flex items-center">
			<NotificationDropdown />
			<AppsDropdown />
			<UserMenu />
		</div>
	</NavContainer>
</Navbar>
