import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		chunkSizeWarningLimit: 1000
	},
	test: {
		include: ['src/**/*.test.ts']
	},
	resolve: {
		alias: {
			$lib: path.resolve('src/lib')
		}
	}
});
