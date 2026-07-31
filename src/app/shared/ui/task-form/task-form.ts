import { Component, output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  // Este evento le manda al componente padre el texto de la nueva tarea.
  agregado = output<string>();

  onAgregar(input: HTMLInputElement): void {
    // trim elimina espacios al final y al inicio
    const titulo = input.value.trim();

    // valida que haya texto, si no no lo guarda
    if (!titulo) {
      return;
    }

    // envia el titulo al padre.
    this.agregado.emit(titulo);
    // limpia el input despues de agregar la tarea.
    input.value = '';
  }
}
