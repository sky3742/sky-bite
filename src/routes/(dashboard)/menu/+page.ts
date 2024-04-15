import { Categories } from '$lib/services/category';

export function load() {
	return {
		categories: Categories
	};
}
