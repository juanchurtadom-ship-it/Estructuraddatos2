export type OrderStatus =
  | 'Recibido'
  | 'En preparación'
  | 'Listo para recoger'
  | 'En camino'
  | 'Entregado';

export interface FoodOrder {
  id: string;
  customerName: string;
  restaurantName: string;
  items: string[];
  total: number;
  address: string;
  status: OrderStatus;
  createdAt: string;
}
