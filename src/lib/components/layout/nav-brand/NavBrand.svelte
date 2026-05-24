<script lang="ts">
	import { APP_NAME } from '$lib/constants/app';
	import { Logo } from '$lib/icons';
</script>

<a href="/" class="flex items-center gap-2">
	<Logo class="h-8 text-gray-900 dark:text-white" />
	<span class="whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white">
		{APP_NAME}
	</span>
</a>
