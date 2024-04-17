<script lang="ts">
	import { Card, P } from 'flowbite-svelte';
	import { ShoppingBagOutline } from 'flowbite-svelte-icons';

	export let label = 'New Orders';
	export let value: number | string = 23;
</script>

<Card class="flex flex-col gap-8" size="none">
	<div class="flex items-center justify-between">
		<P weight="bold" space="tight">{label}</P>
		<ShoppingBagOutline />
	</div>
	<P size="4xl" weight="semibold" space="tight">{value}</P>
</Card>
