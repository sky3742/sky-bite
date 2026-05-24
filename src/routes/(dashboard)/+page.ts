import { getOrders } from '$lib/services/order';

export function load() {
	return {
		orders: getOrders()
	};
}
