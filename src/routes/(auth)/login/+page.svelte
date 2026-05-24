<script lang="ts">
	import { APP_LOGO, APP_NAME } from '$lib/constants/app';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let error = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		if (!email) {
			error = 'Email is required';
			return;
		}
		if (!password) {
			error = 'Password is required';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error = 'Invalid email format';
			return;
		}
		if (password.length < 6) {
			error = 'Password must be at least 6 characters';
			return;
		}
		localStorage.setItem('sb-auth', 'true');
		goto('/');
	}
</script>

<div class="mx-auto max-w-md p-6">
	<div
		class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<div
			class="flex items-center justify-center gap-2 border-b border-gray-200 px-6 py-4 dark:border-gray-700"
		>
			<img class="h-8 w-8" src={APP_LOGO} alt="{APP_NAME} Logo" />
			<span class="text-xl font-semibold text-gray-900 dark:text-white">{APP_NAME}</span>
		</div>
		<div class="space-y-4 p-6 sm:p-8">
			<form class="flex flex-col space-y-6" onsubmit={handleSubmit}>
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to your account</h3>
				{#if error}
					<p class="text-sm text-red-600 dark:text-red-400">{error}</p>
				{/if}
				<div class="space-y-2">
					<label for="email" class="text-sm font-medium text-gray-900 dark:text-white"
						>Your email</label
					>
					<input
						type="email"
						name="email"
						id="email"
						bind:value={email}
						placeholder="name@company.com"
						required
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					/>
				</div>
				<div class="space-y-2">
					<label for="password" class="text-sm font-medium text-gray-900 dark:text-white"
						>Your password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						bind:value={password}
						placeholder="•••••"
						required
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					/>
				</div>
				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						id="remember"
						class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
					/>
					<label for="remember" class="text-sm text-gray-900 dark:text-gray-300">Remember me</label>
				</div>
				<button
					type="submit"
					class="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Sign in
				</button>
			</form>
		</div>
	</div>
</div>
