import { Injectable, signal } from '@angular/core';
import { FoodOrder, OrderStatus } from './order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly storageKey = 'foodflow_demo_orders';
  private readonly orderSignal = signal<FoodOrder[]>(this.loadOrders());
  readonly orders = this.orderSignal.asReadonly();

  constructor() {
    if (this.orderSignal().length === 0) {
      this.orderSignal.set(this.createDemoOrders());
      this.persist();
    }
  }

  updateStatus(orderId: string, status: OrderStatus): void {
    const updated = this.orderSignal().map(order =>
      order.id === orderId ? { ...order, status } : order,
    );
    this.orderSignal.set(updated);
    this.persist();
  }

  private loadOrders(): FoodOrder[] {
    if (typeof localStorage === 'undefined') return [];

    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as FoodOrder[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.orderSignal()));
    }
  }

  private createDemoOrders(): FoodOrder[] {
    return [
      {
        id: 'FF-1001',
        customerName: 'Camila Rojas',
        restaurantName: 'Burger House',
        items: ['Hamburguesa clásica x1', 'Papas medianas x1'],
        total: 32000,
        address: 'Calle 10 # 20-30',
        status: 'Recibido',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'FF-1002',
        customerName: 'Andrés López',
        restaurantName: 'Burger House',
        items: ['Hamburguesa doble x2'],
        total: 46000,
        address: 'Carrera 5 # 8-14',
        status: 'En preparación',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'FF-1003',
        customerName: 'Valentina Díaz',
        restaurantName: 'Burger House',
        items: ['Combo familiar x1'],
        total: 58000,
        address: 'Avenida 6 # 15-22',
        status: 'Listo para recoger',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
