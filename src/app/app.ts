
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ciudad } from './modelos/ciudad';
import { Persona } from './modelos/persona';
import { Grafo } from './modelos/grafo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  grafo = new Grafo();

  ciudades = ['Cali', 'Bogotá', 'Medellín'];
  ciudadSeleccionada = 'Cali';

  personasEncontradas: Persona[] = [];

  constructor() {
    const cali = new Ciudad('Cali');
    const bogota = new Ciudad('Bogotá');
    const medellin = new Ciudad('Medellín');

    this.grafo.agregarCiudad(cali);
    this.grafo.agregarCiudad(bogota);
    this.grafo.agregarCiudad(medellin);

    this.grafo.agregarPersona(new Persona('Andrés', 21, cali));
    this.grafo.agregarPersona(new Persona('Laura', 20, cali));
    this.grafo.agregarPersona(new Persona('Santiago', 23, bogota));
    this.grafo.agregarPersona(new Persona('Valentina', 19, medellin));
    this.grafo.agregarPersona(new Persona('Camilo', 22, bogota));

    this.consultarPersonas();
  }

  consultarPersonas(): void {
    this.personasEncontradas =
      this.grafo.buscarPersonasPorCiudad(this.ciudadSeleccionada);
  }
  
  nodosGrafo = [
    { id: 'cali', nombre: 'Cali', x: 150, y: 100, tipo: 'ciudad' },
    { id: 'bogota', nombre: 'Bogotá', x: 400, y: 100, tipo: 'ciudad' },
    { id: 'medellin', nombre: 'Medellín', x: 650, y: 100, tipo: 'ciudad' },
    { id: 'andres', nombre: 'Andrés', x: 100, y: 250, tipo: 'persona' },
    { id: 'laura', nombre: 'Laura', x: 200, y: 250, tipo: 'persona' },
    { id: 'santiago', nombre: 'Santiago', x: 350, y: 250, tipo: 'persona' },
    { id: 'camilo', nombre: 'Camilo', x: 450, y: 250, tipo: 'persona' },
    { id: 'valentina', nombre: 'Valentina', x: 650, y: 250, tipo: 'persona' }
  ];

  conexionesGrafo = [
    { desde: 'andres', hasta: 'cali' },
    { desde: 'laura', hasta: 'cali' },
    { desde: 'santiago', hasta: 'bogota' },
    { desde: 'camilo', hasta: 'bogota' },
    { desde: 'valentina', hasta: 'medellin' }
  ];

  obtenerNodo(id: string) {
    return this.nodosGrafo.find(nodo => nodo.id === id)!;
  }

}
