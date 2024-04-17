import type { Menu } from './menu';

export enum OrderStatus {
	NEW = 'new',
	INPROGRESS = 'inProgress',
	COMPLETED = 'completed',
	CANCELED = 'canceled'
}

export enum OrderItemStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	CANCELED = 'canceled'
}

export interface Order {
	id: string;
	order: string;
	table: string;
	date: Date;
	amount: number;
	status: OrderStatus;
	items: OrderItem[];
}

export interface OrderItem extends Menu {
	status: OrderItemStatus;
}

export const OrderStatusLabel = {
	[OrderStatus.NEW]: 'New',
	[OrderStatus.INPROGRESS]: 'In Progress',
	[OrderStatus.COMPLETED]: 'Completed',
	[OrderStatus.CANCELED]: 'Canceled'
};

export const OrderItemStatusLabel = {
	[OrderItemStatus.PENDING]: 'Pending',
	[OrderItemStatus.COMPLETED]: 'Completed',
	[OrderItemStatus.CANCELED]: 'Canceled'
};
