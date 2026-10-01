import { Component } from '@angular/core';
import { NodoMenu } from './nodo-menu';
import { ArbolNArio } from './arbol-n-ario';

@Component({
  selector: 'app-root', 
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    menuRaiz: NodoMenu | null = null;
    arbol = new ArbolNArio();

  constructor() {

    

    const inicio = new NodoMenu(
      'Inicio',
      '#',
      'InicioComponent'
    );

    const productos = new NodoMenu(
      'Productos',
      '#',
      'ProductosComponent'
    );

    const usuarios = new NodoMenu(
      'Usuarios',
      '#',
      'UsuariosComponent'
    );

    const configuracion = new NodoMenu(
      'Configuración',
      '#',
      'ConfiguracionComponent'
    );


   

    const listaProductos = new NodoMenu(
      'Lista de productos',
      '#',
      'ListaProductosComponent'
    );

    const nuevoProducto = new NodoMenu(
      'Nuevo producto',
      '#',
      'NuevoProductoComponent'
    );

    const categorias = new NodoMenu(
      'Categorías',
      '#',
      'CategoriasComponent'
    );


    

    const listaUsuarios = new NodoMenu(
      'Lista de usuarios',
      '#',
      'ListaUsuariosComponent'
    );

    const nuevoUsuario = new NodoMenu(
      'Nuevo usuario',
      '#',
      'NuevoUsuarioComponent'
    );


  

    const perfil = new NodoMenu(
      'Perfil',
      '#',
      'PerfilComponent'
    );

    const preferencias = new NodoMenu(
      'Preferencias',
      '#',
      'PreferenciasComponent'
    );


  

    productos.addChild(listaProductos);
    productos.addChild(nuevoProducto);
    productos.addChild(categorias);

    usuarios.addChild(listaUsuarios);
    usuarios.addChild(nuevoUsuario);

    configuracion.addChild(perfil);
    configuracion.addChild(preferencias);


  

    const menuPrincipal = new NodoMenu(
      'Menú principal',
      '#',
      'MenuPrincipalComponent'
    );


  

    menuPrincipal.addChild(inicio);
    menuPrincipal.addChild(productos);
    menuPrincipal.addChild(usuarios);
    menuPrincipal.addChild(configuracion);


    

    this.arbol.establecerRaiz(menuPrincipal);
    this.menuRaiz = this.arbol.raiz;


    
    console.log('Árbol N-ario:', this.arbol);
    console.log('Menú principal:', this.arbol.raiz);
  }
}