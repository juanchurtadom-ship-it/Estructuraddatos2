import { ListaCircular } from '../structures/lista-circular';
import { Medico } from '../structures/medico';
import { Component, signal } from '@angular/core';
import { ListaEnlazada } from '../structures/lista-enlazada';
import { ListaDoblementeEnlazada } from '../structures/lista-doblemente-enlazada';
import { Paciente } from '../structures/paciente';
import { ListaCircularDoble } from '../structures/lista-circular-doble';
import { Miembro } from '../structures/miembro';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  pacientesLista = new ListaEnlazada<Paciente>();
  historialLista = new ListaDoblementeEnlazada<Paciente>();
  medicosLista = new ListaCircular<Medico>();
  comiteLista = new ListaCircularDoble<Miembro>();

 comite = signal<Miembro[]>([]);
  medicos = signal<Medico[]>([]);
  medicoActual = signal<Medico | null>(null);
  pacientes = signal<Paciente[]>([]);
  historial = signal<Paciente[]>([]);


  constructor() {

    

    this.pacientesLista.append({
      id: 1,
      name: 'Juan',
      edad: 25,
      motivo: 'Dolor de cabeza'
    });

    this.pacientesLista.append({
      id: 2,
      name: 'Maria',
      edad: 30,
      motivo: 'Dolor de estomago'
    });

    this.pacientesLista.append({
      id: 3,
      name: 'Carlos',
      edad: 40,
      motivo: 'Fiebre'
    });

    this.medicosLista.append({
  id: 1,
  name: 'Dr. Pedro',
  especialidad: 'Medicina general'
});

this.medicosLista.append({
  id: 2,
  name: 'Dra. Laura',
  especialidad: 'Pediatría'
});

this.medicosLista.append({
  id: 3,
  name: 'Dr. Carlos',
  especialidad: 'Cardiología'
});
this.comiteLista.append({
  id: 1,
  name: 'Ana',
  cargo: 'Directora'
});

this.comiteLista.append({
  id: 2,
  name: 'Luis',
  cargo: 'Administrador'
});

this.comiteLista.append({
  id: 3,
  name: 'Sofia',
  cargo: 'Coordinadora'
});

    this.actualizarPacientes();
    this.actualizarHistorial();
    this.actualizarMedicos();
    this.actualizarComite();
   
    setInterval(() => {
  this.medicosLista.next();
  this.actualizarMedicos();
}, 10000);
  }



  actualizarPacientes(): void {

    this.pacientes.set(
      this.pacientesLista.print()
    );

  }


  actualizarHistorial(): void {

    this.historial.set(
      this.historialLista.print()
    );

  }

  actualizarMedicos(): void {
  this.medicos.set(this.medicosLista.print());
  this.medicoActual.set(this.medicosLista.peek());

}
actualizarComite(): void {
  this.comite.set(this.comiteLista.print());
}

siguienteComite(): void {
  this.comiteLista.next();
  this.actualizarComite();
}

anteriorComite(): void {
  this.comiteLista.previous();
  this.actualizarComite();
}


  atenderPaciente(): void {

    
    const paciente = this.pacientesLista.remove();

    if (paciente !== null) {

    
      this.historialLista.append(paciente);

      
      this.actualizarPacientes();
      this.actualizarHistorial();

    }

  }

}