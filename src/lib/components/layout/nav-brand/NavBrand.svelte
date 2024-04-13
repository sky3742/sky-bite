<script lang="ts">
	import { APP_NAME, APP_URL } from '$lib/constants/Constant';
	import { Logo } from '$lib/icons';
	import { NavBrand, P } from 'flowbite-svelte';
</script>

<NavBrand href={APP_URL}>
	<Logo class="mr-3 h-8 dark:text-white" />
	<P whitespace="nowrap" align="center" size="2xl" weight="semibold">
		{APP_NAME}
	</P>
</NavBrand>
