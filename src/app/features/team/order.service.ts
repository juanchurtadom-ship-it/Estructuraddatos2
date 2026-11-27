import {
  Injectable,
  effect,
  inject,
  signal
} from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot
} from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import {
  FoodOrder,
  OrderStatus
} from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Conexión con Firebase
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(AuthService);

  // Pedidos sincronizados
  private readonly orderSignal = signal<FoodOrder[]>([]);

  readonly orders = this.orderSignal.asReadonly();

  constructor() {

    // Escuchar cambios de autenticación y pedidos
    effect((onCleanup) => {

      const user = this.auth.user();

      if (!user) {
        this.orderSignal.set([]);
        return;
      }

      const ordersCollection = collection(
        this.firestore,
        'orders'
      );

      // Los restaurantes reciben todos los pedidos.
      // Los clientes reciben únicamente sus pedidos.
      const ordersQuery = user.role === 'restaurante'
        ? query(ordersCollection)
        : query(
            ordersCollection,
            where('customerId', '==', user.id)
          );

      const unsubscribe = onSnapshot(
        ordersQuery,

        snapshot => {

          const orders = snapshot.docs.map(document => {

            return {
              ...document.data(),
              id: document.id
            } as FoodOrder;

          });

          // Ordenar por fecha, del más reciente al más antiguo
          orders.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );

          this.orderSignal.set(orders);

        },

        error => {
          console.error(
            'Error sincronizando pedidos:',
            error
          );
        }

      );

      // Detener la escucha anterior cuando cambia la sesión
      onCleanup(() => unsubscribe());

    });

  }

  // =====================================
  // REGISTRAR PEDIDO
  // =====================================

  async addOrder(order: FoodOrder): Promise<void> {

    const user = this.auth.user();

    if (!user) {
      throw new Error(
        'Debes iniciar sesión para realizar un pedido.'
      );
    }

    const orderReference = doc(
      this.firestore,
      'orders',
      order.id
    );

    await setDoc(orderReference, {
      ...order,
      id: order.id,
      customerId: user.id
    });

  }

  

  async updateStatus(
    orderId: string,
    status: OrderStatus
  ): Promise<void> {

    const user = this.auth.user();

    if (!user || user.role !== 'restaurante') {
      throw new Error(
        'No tienes permisos para actualizar pedidos.'
      );
    }

    const orderReference = doc(
      this.firestore,
      'orders',
      orderId
    );

    await updateDoc(orderReference, {
      status
    });

  }

}