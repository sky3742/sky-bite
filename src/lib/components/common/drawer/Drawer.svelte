<script lang="ts">
	import { CloseButton, Drawer, Heading } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	export let title = 'Drawer title';
	export let hidden = true;
	export let placement: 'left' | 'right' | 'top' | 'bottom';
</script>

<Drawer
	transitionType="fly"
	transitionParams={{
		x: 320,
		duration: 200,
		easing: sineIn
	}}
	bind:hidden
	{placement}
>
	<div class="grid gap-6">
		<div class="flex items-center">
			<Heading tag="h5">{title}</Heading>
			<CloseButton class="dark:text-white" on:click={() => (hidden = false)} />
		</div>

		<slot />
	</div>
</Drawer>
