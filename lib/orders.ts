import type { Order } from "@/types/order";
import { readDb, writeDb } from "./db";

const orders: Order[] = [];

export function getOrders(): Order[] {
  const db = readDb();
  return db.orders;
}

export function getOrderById(id: string): Order | undefined {
  const db = readDb();
  return db.orders.find((order) => order.id === id);
}

export function createOrder(order: Omit<Order, "id">): Order {
  const db = readDb();
  const newOrder = { ...order, id: `ORD-${db.orders.length + 1}` };
  db.orders.push(newOrder);
  writeDb(db);
  return newOrder;
}

export function updateOrder(
  id: string,
  updates: Partial<Order>
): Order | undefined {
  const db = readDb();
  const index = db.orders.findIndex((order) => order.id === id);
  if (index !== -1) {
    db.orders[index] = { ...db.orders[index], ...updates };
    writeDb(db);
    return db.orders[index];
  }
  return undefined;
}

export function deleteOrder(id: string): boolean {
  const db = readDb();
  const initialLength = db.orders.length;
  db.orders = db.orders.filter((order) => order.id !== id);
  if (db.orders.length < initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}
