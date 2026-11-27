# Informe técnico: FoodFlow

## 1. Objetivo

FoodFlow es una aplicación web académica para explorar restaurantes, buscar opciones, armar un carrito y enviar pedidos. Incluye registro e inicio de sesión con Firebase Authentication, perfiles en Cloud Firestore y un panel donde las cuentas autorizadas de restaurante consultan y actualizan pedidos en tiempo real.

## 2. Tecnologías y arquitectura

- Angular 22 con componentes standalone, Angular Router y Signals.
- TypeScript para la interfaz y las estructuras de datos.
- Firebase Authentication para autenticación por correo y contraseña.
- Cloud Firestore para perfiles y pedidos, con escucha en tiempo real.
- Netlify como destino de publicación estática.

La lógica de presentación está en `src/app`; los servicios de sesión y pedidos están en `src/app/features/team`; las estructuras se implementan en `src/app/structures`.

## 3. Estructuras de datos

### Lista enlazada — carrito

`LinkedList<T>` conserva una referencia al primer nodo y encadena los elementos del carrito. Permite recorrer, agregar, eliminar por predicado y vaciar.

- `append`: O(n), porque recorre la lista hasta el último nodo.
- `remove`: O(n), búsqueda secuencial.
- `toArray`: O(n).
- Memoria: O(n).

### Cola — pedidos locales

`Queue<T>` almacena pedidos en un arreglo siguiendo FIFO: `enqueue`, `dequeue`, `peek` y copia del contenido. En esta implementación, `enqueue` es O(1) amortizado y `dequeue` es O(n), ya que `Array.shift()` desplaza los elementos restantes. La memoria es O(n).

### Trie — búsqueda

`Trie<T>` almacena caracteres en nodos con mapas de hijos y reúne valores al buscar un prefijo. Normaliza mayúsculas y tildes.

- Insertar una palabra de longitud m: O(m).
- Encontrar el nodo del prefijo de longitud p: O(p); reunir resultados puede recorrer los nodos del subárbol, además del número de valores devueltos.
- El espacio depende del número total de prefijos distintos almacenados.

### Árbol AVL — ranking

`AVLTree<T>` mantiene alturas y rota nodos al insertar para conservar el balance. La aplicación compara restaurantes por calificación y nombre, y recorre el árbol en orden para obtener una secuencia ordenada.

- Buscar e insertar: O(log n) en el árbol balanceado.
- Recorrido en orden: O(n).
- Memoria: O(n).

### Grafo y Dijkstra — rutas

`Graph` representa ubicaciones mediante listas de adyacencia y aristas ponderadas por distancia. Dijkstra encuentra la ruta más corta con distancias no negativas.

- La selección del vértice de menor distancia recorre los no visitados: O(V² + E) en conjunto.
- El espacio es O(V + E).
- `addEdge` es bidireccional por defecto.

## 4. Persistencia y seguridad

Los perfiles se guardan en `users/{uid}`. Las altas públicas solo pueden crear perfiles con rol `cliente`. Las cuentas de restaurante se aprovisionan manualmente por administración; no se debe cambiar este rol desde un formulario público.

Los pedidos se guardan en `orders/{id}` e incluyen `customerId`. El cliente puede leer sus propios pedidos y una cuenta con rol restaurante puede leerlos para operar el panel. Solo esa cuenta puede cambiar el estado; no se permiten borrados desde el cliente.

Las reglas fuente están en `firestore.rules`. Deben publicarse en el proyecto Firebase configurado y revisarse junto con la rúbrica antes de la demostración. El código cliente no contiene secretos de servidor; las claves Firebase del frontend identifican el proyecto y el control de acceso se aplica mediante reglas.

## 5. Flujos funcionales

1. El cliente crea cuenta y queda autenticado.
2. La aplicación carga su perfil desde Firestore.
3. El cliente agrega productos de un restaurante al carrito.
4. Para confirmar, inicia sesión; el pedido se escribe con su UID.
5. El panel de restaurante recibe cambios en tiempo real y actualiza el estado.

El catálogo y el recorrido de demostración usan datos definidos en el frontend. El pedido utiliza una dirección de ejemplo pendiente de confirmar; para un uso real debe añadirse un formulario de dirección antes de finalizar la compra.

## 6. Compilación y publicación

```bash
npm ci
npm run build
```

Netlify usa `netlify.toml`: comando `npm run build`, directorio `dist/foodflow/browser` y fallback a `index.html` para Angular Router. Tras publicar, el dominio debe registrarse entre los dominios autorizados de Firebase Authentication. Las reglas de Firestore se publican por Firebase CLI o desde Firebase Console.

## 7. Datos que deben completar los autores

Integrantes: Juan Camilo Hurtado y Jhan Carlos Vasquez. URL final de Netlify publicada : https://estructuraddatos2.netlify.app/.
