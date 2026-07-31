import { Injectable, computed, effect, signal } from '@angular/core';
import { Task } from './task';

const STORAGE_KEY = 'tareas';


/*clase que concentra la logica de negocio de las tareas, es decir, la logica que no tiene que ver con la vista,
 sino con el estado de la aplicacion */

 // INJECTABLE hace un dispatch para que esta clase este disponible, recibe el paametro root para todo el proyecto
@Injectable({ providedIn: 'root' })
export class TaskStore {
  tareas = signal<Task[]>(this.cargar());
 // computed es preferible en el front, leen el valor a partir de una modificacion y lo muestran al front
  pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);
  completadas = computed(() => this.tareas().filter((t) => t.completada).length);

  constructor() {
    //effect es preferible en el back, se ejecuta cuando hay un cambio en el estado de la aplicacion es como un listener
    effect(() => {

  //STRINGIFY ayuda a convertir el objeto en un string para poder guardarlo en el localStorage
  //localstorage es una parte que nos permite almacenar datos primitivos, es decir, datos que no son objetos, 
  // en el navegador del usuario, de manera que se puedan recuperar posteriormente
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas()));
    });
  }

  agregar(titulo: string): void {
    const limpio = titulo.trim();
    if (!limpio) {
      return;
    }

    this.tareas.update((lista) => [
      ...lista,
      { id: Date.now(), titulo: limpio, completada: false },
    ]);
  }

  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  limpiarCompletadas(): void {
    this.tareas.update((lista) => lista.filter((t) => !t.completada));
  }

  private cargar(): Task[] {
    const guardadas = localStorage.getItem(STORAGE_KEY);

    if (guardadas) {
      return JSON.parse(guardadas);
    }

    return [
      { id: 1, titulo: 'Agrega una tarea', completada: false },
    ];
  }
}
