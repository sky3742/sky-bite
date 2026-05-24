import { describe, it, expect } from 'vitest';
import {
	getOrders,
	processOrder,
	updateOrder,
	updateOrderItem,
	cancelOrder,
	createOrder
} from './order';
import { OrderItemStatus, OrderStatus, type Order } from '$lib/types/order';
import type { Menu } from '$lib/types/menu';

describe('order service', () => {
	const initialLength = getOrders().length;

	it('getOrders returns initial orders', () => {
		const orders = getOrders();
		expect(orders.length).toBeGreaterThan(0);
		expect(orders[0]).toHaveProperty('id');
		expect(orders[0]).toHaveProperty('order');
		expect(orders[0]).toHaveProperty('table');
		expect(orders[0]).toHaveProperty('date');
		expect(orders[0]).toHaveProperty('amount');
		expect(orders[0]).toHaveProperty('status');
		expect(orders[0]).toHaveProperty('items');
	});

	describe('processOrder', () => {
		const baseItem: Menu = {
			id: 'item-1',
			name: 'Test Item',
			description: 'desc',
			image: 'img.png',
			price: 10,
			active: true,
			categoryId: 'cat-1'
		};
		const baseOrder = {
			id: 'order-test',
			order: '#9999',
			table: 'Table 1',
			date: new Date(),
			amount: 0,
			status: OrderStatus.NEW,
			items: [] as Order['items']
		};

		it('sets status to NEW when all items are PENDING', () => {
			const order = processOrder({
				...baseOrder,
				items: [
					{ ...baseItem, status: OrderItemStatus.PENDING },
					{ ...baseItem, id: 'item-2', status: OrderItemStatus.PENDING, price: 20 }
				]
			});
			expect(order.status).toBe(OrderStatus.NEW);
			expect(order.amount).toBe(30);
		});

		it('sets status to COMPLETED when all items are COMPLETED', () => {
			const order = processOrder({
				...baseOrder,
				items: [
					{ ...baseItem, status: OrderItemStatus.COMPLETED },
					{ ...baseItem, id: 'item-2', status: OrderItemStatus.COMPLETED, price: 20 }
				]
			});
			expect(order.status).toBe(OrderStatus.COMPLETED);
			expect(order.amount).toBe(30);
		});

		it('sets status to CANCELED when all items are CANCELED', () => {
			const order = processOrder({
				...baseOrder,
				items: [
					{ ...baseItem, status: OrderItemStatus.CANCELED },
					{ ...baseItem, id: 'item-2', status: OrderItemStatus.CANCELED, price: 20 }
				]
			});
			expect(order.status).toBe(OrderStatus.CANCELED);
			expect(order.amount).toBe(0);
		});

		it('sets status to INPROGRESS when some items are PENDING and some COMPLETED', () => {
			const order = processOrder({
				...baseOrder,
				items: [
					{ ...baseItem, status: OrderItemStatus.PENDING },
					{ ...baseItem, id: 'item-2', status: OrderItemStatus.COMPLETED, price: 20 }
				]
			});
			expect(order.status).toBe(OrderStatus.INPROGRESS);
			expect(order.amount).toBe(30);
		});

		it('sets status to COMPLETED when mixed COMPLETED and CANCELED (no PENDING)', () => {
			const order = processOrder({
				...baseOrder,
				items: [
					{ ...baseItem, status: OrderItemStatus.COMPLETED },
					{ ...baseItem, id: 'item-2', status: OrderItemStatus.CANCELED, price: 20 }
				]
			});
			expect(order.status).toBe(OrderStatus.COMPLETED);
			expect(order.amount).toBe(10);
		});

		it('recalculates amount excluding canceled items', () => {
			const order = processOrder({
				...baseOrder,
				items: [
					{ ...baseItem, status: OrderItemStatus.COMPLETED, price: 10 },
					{ ...baseItem, id: 'item-2', status: OrderItemStatus.CANCELED, price: 20 },
					{ ...baseItem, id: 'item-3', status: OrderItemStatus.PENDING, price: 30 }
				]
			});
			expect(order.amount).toBe(40);
		});
	});

	it('updateOrder replaces an existing order', () => {
		const all = getOrders();
		const target = all[0];
		const modified = { ...target, table: 'VIP Room' };
		updateOrder(modified);
		const fetched = getOrders().find((o) => o.id === target.id);
		expect(fetched?.table).toBe('VIP Room');
	});

	it('updateOrderItem updates a specific item and reprocesses the order', () => {
		const all = getOrders();
		const order = all.find((o) => o.items.length > 0);
		if (!order) return;
		const item = order.items[0];
		const newStatus =
			item.status === OrderItemStatus.COMPLETED
				? OrderItemStatus.PENDING
				: OrderItemStatus.COMPLETED;
		updateOrderItem(order.id, { ...item, status: newStatus });
		const fetched = getOrders().find((o) => o.id === order.id);
		const updatedItem = fetched?.items.find((i) => i.id === item.id);
		expect(updatedItem?.status).toBe(newStatus);
	});

	it('cancelOrder sets all items to CANCELED and status to CANCELED', () => {
		const order = createOrder({
			order: '#CANCEL-TEST',
			table: 'Table X',
			date: new Date(),
			items: [
				{
					id: 'ci-1',
					name: 'Cancel Item',
					description: 'desc',
					image: 'img.png',
					price: 15,
					active: true,
					categoryId: 'cat-1',
					status: OrderItemStatus.PENDING
				}
			]
		});
		cancelOrder(order.id);
		const fetched = getOrders().find((o) => o.id === order.id);
		expect(fetched?.status).toBe(OrderStatus.CANCELED);
		expect(fetched?.items.every((i) => i.status === OrderItemStatus.CANCELED)).toBe(true);
		expect(fetched?.amount).toBe(0);
	});

	it('createOrder adds a new order at the beginning', () => {
		const data = {
			order: '#NEW-TEST',
			table: 'Takeaway',
			date: new Date(),
			items: [
				{
					id: 'ni-1',
					name: 'New Item',
					description: 'desc',
					image: 'img.png',
					price: 25,
					active: true,
					categoryId: 'cat-1',
					status: OrderItemStatus.PENDING
				}
			]
		};
		const created = createOrder(data);
		expect(created.id).toBeTruthy();
		expect(created.order).toBe('#NEW-TEST');
		expect(created.status).toBe(OrderStatus.NEW);
		expect(created.amount).toBe(25);

		const all = getOrders();
		expect(all.length).toBe(initialLength + 2);
		expect(all[0].id).toBe(created.id);
	});
});
