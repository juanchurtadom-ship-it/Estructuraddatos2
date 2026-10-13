
import { Ciudad } from './ciudad';
import { Persona } from './persona';

export class Grafo {
  private ciudades: Ciudad[] = [];
  private personas: Persona[] = [];

  agregarCiudad(ciudad: Ciudad): void {
    const existe = this.ciudades.some(
      c => c.nombre.toLowerCase() === ciudad.nombre.toLowerCase()
    );

    if (!existe) {
      this.ciudades.push(ciudad);
    }
  }

  agregarPersona(persona: Persona): void {
    const existeCiudad = this.ciudades.some(
      c => c.nombre.toLowerCase() === persona.ciudad.nombre.toLowerCase()
    );

    if (!existeCiudad) {
      this.agregarCiudad(persona.ciudad);
    }

    this.personas.push(persona);
  }

  buscarCiudad(nombre: string): Ciudad | undefined {
    return this.ciudades.find(
      ciudad => ciudad.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

  buscarPersonasPorCiudad(nombreCiudad: string): Persona[] {
    return this.personas.filter(
      persona =>
        persona.ciudad.nombre.toLowerCase() === nombreCiudad.toLowerCase()
    );
  }

  obtenerCiudades(): Ciudad[] {
    return [...this.ciudades];
  }

  obtenerPersonas(): Persona[] {
    return [...this.personas];
  }

  estaVacio(): boolean {
    return this.ciudades.length === 0 && this.personas.length === 0;
  }

  imprimir(): void {
    console.log('CIUDADES Y PERSONAS');

    this.ciudades.forEach(ciudad => {
      console.log(`Ciudad: ${ciudad.nombre}`);

      const habitantes = this.buscarPersonasPorCiudad(ciudad.nombre);

      habitantes.forEach(persona => {
        console.log(`  - ${persona.nombre}, ${persona.edad} años`);
      });
    });
  }
}
