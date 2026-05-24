import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2017,
				...globals.node
			},
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: eslintPluginSvelte.parser,
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'build',
			'.svelte-kit',
			'package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
			'.vercel'
		]
	},
	{
		files: ['**/*.cjs'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off'
		}
	},
	{
		rules: {
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
);
