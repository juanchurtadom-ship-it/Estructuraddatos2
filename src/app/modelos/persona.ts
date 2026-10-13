
import { Ciudad } from './ciudad';

export class Persona {
  constructor(
    public nombre: string,
    public edad: number,
    public ciudad: Ciudad
  ) {}

  toString(): string {
    return `${this.nombre}, ${this.edad} años - ${this.ciudad.nombre}`;
  }
}
