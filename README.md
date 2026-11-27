# FoodFlow

Aplicación web de pedidos de comida creada con Angular y Firebase. El proyecto incluye catálogo con búsqueda y categorías, carrito, cuentas de cliente, panel de restaurante y cinco estructuras de datos aplicadas a funciones del sistema.

## Requisitos

- Node.js compatible con Angular CLI 22 y npm.
- Proyecto Firebase con Authentication (correo y contraseña) y Cloud Firestore.

## Desarrollo local

```bash
npm ci
npm start
```

La aplicación queda disponible en `http://localhost:4200/`.

## Compilar para producción

```bash
npm run build
```

El resultado Angular se genera en `dist/foodflow/browser`. La configuración de conexión Firebase está en `src/app/app.config.ts`. Antes de publicar, confirma que las claves correspondan al proyecto Firebase de entrega y que los dominios autorizados estén configurados en Firebase Authentication.

## Firebase

El proyecto enlazado por Firebase CLI es `foodflow-2431b` (`.firebaserc`). Publica las reglas incluidas con:

```bash
npx firebase-tools deploy --only firestore:rules --project foodflow-2431b
```

Activa el proveedor de correo y contraseña en Firebase Authentication. Las altas públicas crean cuentas de cliente. Para habilitar el panel, crea la cuenta de restaurante en Authentication y crea manualmente `users/{UID}` en Firestore con `id`, `name`, `email`, `role: "restaurante"` y `createdAt`. Solo una persona administradora debe asignar ese rol.

## Publicar en Netlify

Conecta el repositorio a Netlify y configura:

- Build command: `npm run build`
- Publish directory: `dist/foodflow/browser`

La regla de `netlify.toml` permite que las rutas de Angular Router carguen correctamente. Agrega el dominio publicado a los dominios autorizados de Firebase Authentication.

## Estructuras de datos

| Estructura | Uso | Coste de la implementación |
| --- | --- | --- |
| Lista enlazada | Elementos del carrito | `append` y `remove`: O(n); recorrido: O(n) |
| Cola | Orden local de pedidos | `enqueue`: O(1); `dequeue`: O(n) porque usa `Array.shift()` |
| Trie | Búsqueda por prefijo en restaurantes | Inserción: O(m); búsqueda: O(m + nodos recorridos para reunir resultados) |
| Árbol AVL | Orden y búsqueda de restaurantes por calificación | Inserción y búsqueda: O(log n); recorrido ordenado: O(n) |
| Grafo con Dijkstra | Ruta de entrega de menor distancia | O(V² + E), con selección lineal del siguiente vértice |

La descripción técnica, limitaciones y criterios de prueba están en [`docs/INFORME_TECNICO.md`](docs/INFORME_TECNICO.md).

## Integrantes y propuesta gráfica

Integrantes: Juan Camilo Hurtado y Jhan Carlos Vasquez.

Agrega aquí el enlace de la propuesta gráfica solicitada por el curso.
