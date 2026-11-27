import { Component, inject, signal } from '@angular/core';

import {
  Router,
  RouterOutlet,
  RouterLink,
  NavigationEnd
} from '@angular/router';

import { Trie } from './structures/trie';
import { LinkedList } from './structures/linked-list';
import { Queue } from './structures/queue';

import { OrderService } from './features/team/order.service';
import { AuthService } from './features/team/auth.service';
import { FoodOrder } from './features/team/order.model';
import { AVLTree } from './structures/avl-tree.';
import { Graph } from './structures/graph';
interface CartItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
}
interface RestaurantRecord {
  id: number;
  name: string;
  rating: number;
}


interface FoodFlowOrder {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

private deliveryGraph = new Graph();

deliveryRoute = signal<{
  path: string[];
  distance: number;
} | null>(null);
  
private restaurantTree = new AVLTree<RestaurantRecord>(
  (a, b) =>
    a.rating - b.rating ||
    a.name.localeCompare(b.name)
);

getTopRestaurant(): RestaurantRecord | undefined {
  return this.rankedRestaurants()[0];
}

rankedRestaurants = signal<RestaurantRecord[]>([]);

  
  protected readonly title = signal<string>('FoodFlow');

  
  isHomePage = signal(true);

  private readonly router = inject(Router);

  
  readonly searchTerm = signal<string>('');

  
  private restaurantTrie = new Trie<string>();

  
  private cart = new LinkedList<CartItem>();

  
  cartOpen = signal(false);
  cartCount = signal(0);

  
  private orderQueue = new Queue<FoodFlowOrder>();

  
  queuedOrders = signal<FoodFlowOrder[]>([]);

  
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  constructor() {
this.restaurantTree.insert({
  id: 1,
  name: 'Burger House',
  rating: 4.9
});

this.restaurantTree.insert({
  id: 2,
  name: 'Napoli Pizza',
  rating: 4.8
});

this.restaurantTree.insert({
  id: 3,
  name: 'Sakura Sushi',
  rating: 4.7
});

this.rankedRestaurants.set(
  this.restaurantTree.inOrder().reverse()
);

    
    this.isHomePage.set(this.router.url === '/');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage.set(event.urlAfterRedirects === '/');
      }
    });

    
    this.indexRestaurant(
      'Burger House',
      'Hamburguesas Americana'
    );

    this.indexRestaurant(
      'Napoli Pizza',
      'Pizza Italiana'
    );

    this.indexRestaurant(
      'Sakura Sushi',
      'Sushi Japonesa'
    );
    
this.configureDeliveryGraph();

this.calculateDeliveryRoute('Restaurante', 'Cliente');
  }
  

  

  private indexRestaurant(
    name: string,
    description: string
  ): void {

    const words = `${name} ${description}`.split(/\s+/);

    for (const word of words) {
      this.restaurantTrie.insert(word, name);
    }

    this.restaurantTrie.insert(name, name);
    this.restaurantTrie.insert(description, name);
  }

  

  updateSearch(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.searchTerm.set(
      input.value.toLowerCase().trim()
    );
  }

  matchesSearch(
    name: string,
    description: string
  ): boolean {

    const term = this.searchTerm();

    if (!term) {
      return true;
    }

    const results = this.restaurantTrie.search(term);

    return (
      results.includes(name) ||
      name.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term)
    );
  }

  
  selectCategory(category: string): void {

    this.searchTerm.set(
      category.toLowerCase().trim()
    );
  }


  addToCart(
    name: string,
    restaurant: string,
    price: number
  ): void {

    const currentItems = this.cart.toArray();

    if (
      currentItems.length > 0 &&
      currentItems[0].restaurant !== restaurant
    ) {
      alert(
        'Finaliza tu pedido actual antes de elegir otro restaurante.'
      );
      return;
    }

    const item: CartItem = {
      id: `${Date.now()}-${this.cart.size}`,
      name,
      restaurant,
      price
    };

    this.cart.append(item);

    this.cartCount.set(this.cart.size);
  }

  
  getCartItems(): CartItem[] {

    return this.cart.toArray();
  }

  
  removeFromCart(id: string): void {

    this.cart.remove(item => item.id === id);

    this.cartCount.set(this.cart.size);
  }

  
  getCartTotal(): number {

    return this.cart.toArray().reduce(
      (total, item) => total + item.price,
      0
    );
  }

  
  toggleCart(): void {

    this.cartOpen.update(
      open => !open
    );
  }

 
  async placeOrder(): Promise<void> {

    const items = this.cart.toArray();

    if (items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    if (!this.authService.user()) {
      alert('Inicia sesión para confirmar tu pedido.');
      await this.router.navigateByUrl('/login');
      return;
    }

    const order: FoodFlowOrder = {

      id: `FF-${Date.now()}`,

      items,

      total: this.getCartTotal(),

      createdAt: new Date(),

      status: 'Recibido'
    };

    const sharedOrder: FoodOrder = {

      id: order.id,

      customerName:
        this.authService.user()?.name ?? 'Cliente FoodFlow',

      restaurantName: items[0].restaurant,

      items: items.map(item => item.name),

      total: order.total,

      address: 'Dirección pendiente de confirmar',

      status: 'Recibido',

      createdAt: order.createdAt.toISOString()
    };

    try {
      await this.orderService.addOrder(sharedOrder);
    } catch (error) {
      console.error('No se pudo guardar el pedido:', error);
      alert('No se pudo guardar tu pedido. Inténtalo de nuevo.');
      return;
    }

    this.orderQueue.enqueue(order);
    this.queuedOrders.set(this.orderQueue.toArray());

    
    this.cart.clear();

    this.cartCount.set(0);

    this.cartOpen.set(false);

    alert(
      '¡Tu pedido fue enviado al restaurante!'
    );
  }

  
  getNextOrder(): FoodFlowOrder | undefined {

    return this.orderQueue.peek();
  }

  
  processNextOrder(): FoodFlowOrder | undefined {

    const processedOrder = this.orderQueue.dequeue();

    this.queuedOrders.set(
      this.orderQueue.toArray()
    );

    return processedOrder;
  }
  // Configurar puntos y distancias del recorrido
configureDeliveryGraph(): void {

  this.deliveryGraph.addEdge(
    'Restaurante',
    'Centro',
    3
  );

  this.deliveryGraph.addEdge(
    'Restaurante',
    'Sur',
    5
  );

  this.deliveryGraph.addEdge(
    'Centro',
    'Norte',
    4
  );

  this.deliveryGraph.addEdge(
    'Centro',
    'Cliente',
    6
  );

  this.deliveryGraph.addEdge(
    'Norte',
    'Cliente',
    3
  );

  this.deliveryGraph.addEdge(
    'Sur',
    'Cliente',
    2
  );
}

// Calcular la ruta de entrega más corta
calculateDeliveryRoute(
  start: string,
  end: string
): void {

  const route = this.deliveryGraph.shortestPath(
    start,
    end
  );

  this.deliveryRoute.set(route);
}
  

}
