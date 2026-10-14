
export type TipoElemento = 'carpeta' | 'archivo';

export class NodoArchivo {
  id: string;
  nombre: string;
  tipo: TipoElemento;
  creadoPor: string;
  hijos: NodoArchivo[];

  constructor(
    nombre: string,
    tipo: TipoElemento,
    creadoPor: string,
    id?: string
  ) {
    this.id =
      id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    this.nombre = nombre;
    this.tipo = tipo;
    this.creadoPor = creadoPor;
    this.hijos = [];
  }

  agregarHijo(hijo: NodoArchivo): void {
    if (this.tipo === 'archivo') {
      throw new Error('Un archivo no puede tener hijos.');
    }

    this.hijos.push(hijo);
  }

  esCarpeta(): boolean {
    return this.tipo === 'carpeta';
  }

  esArchivo(): boolean {
    return this.tipo === 'archivo';
  }
}
