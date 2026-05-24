import { OrderItemStatus, OrderStatus, type Order, type OrderItem } from '$lib/types/order';
import { faker } from '@faker-js/faker';
import { getFood } from './menu';

let orders: Order[] = Array.from({ length: 30 }, (_, i) => {
	const menu = faker.helpers
		.arrayElements(getFood(), { min: 1, max: 3 })
		.map<OrderItem>((food) => ({
			...food,
			status: faker.helpers.arrayElement(Object.values(OrderItemStatus))
		}));

	return processOrder({
		id: faker.string.uuid(),
		order: `#${1000 + 20 - i}`,
		table: faker.helpers.arrayElement([
			'Table 1',
			'Table 2',
			'Table 3',
			'Table 4',
			'Table 5',
			'Takeaway'
		]),
		date: faker.date.recent(),
		items: menu,
		amount: 0,
		status: OrderStatus.NEW
	});
});

export function getOrders(): Order[] {
	return orders;
}

export function processOrder(order: Order): Order {
	const amount = order.items
		.filter((item) => item.status !== OrderItemStatus.CANCELED)
		.reduce((total, item) => total + item.price, 0);

	const allCanceled = order.items.every((item) => item.status === OrderItemStatus.CANCELED);
	const allPending = order.items.every((item) => item.status === OrderItemStatus.PENDING);
	const somePending = order.items.some((item) => item.status === OrderItemStatus.PENDING);

	const status = allCanceled
		? OrderStatus.CANCELED
		: allPending
			? OrderStatus.NEW
			: somePending
				? OrderStatus.INPROGRESS
				: OrderStatus.COMPLETED;

	return {
		...order,
		amount,
		status
	};
}

export function updateOrder(order: Order): void {
	orders = orders.map((o) => (o.id === order.id ? order : o));
}

export function updateOrderItem(orderId: string, item: OrderItem): void {
	orders = orders.map((o) => {
		if (o.id !== orderId) return o;
		const items = o.items.map((i) => (i.id === item.id ? item : i));
		return processOrder({ ...o, items });
	});
}

export function cancelOrder(id: string): void {
	orders = orders.map((o) => {
		if (o.id !== id) return o;
		const items = o.items.map((item) => ({ ...item, status: OrderItemStatus.CANCELED }));
		return processOrder({ ...o, items });
	});
}

export function createOrder(data: Omit<Order, 'id' | 'amount' | 'status'>): Order {
	const order = processOrder({
		...data,
		id: faker.string.uuid(),
		amount: 0,
		status: OrderStatus.NEW
	});
	orders = [order, ...orders];
	return order;
}
