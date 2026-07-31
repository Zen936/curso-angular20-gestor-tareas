import { Component, input, output } from '@angular/core';
import { Task } from '../../../features/tareas/task';

@Component({
  //selector es un decorador que permite definir el nombre del componente, en este caso app-task-item
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
 // input es un decorador que permite recibir datos desde el componente padre, en este caso la tarea que se va a mostrar
 //parametro entrada
    task = input.required<Task>();
    //emite un evento al padre para que actualice la tarea
    toggle = output<number>();
    //emite un evento al padre para que elimine la tarea
    removed = output<number>();
}
