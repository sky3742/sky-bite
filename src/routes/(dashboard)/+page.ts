import { Orders } from '$lib/services/order';

export function load() {
	return {
		orders: Orders
	};
}
