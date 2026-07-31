import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskStore } from './features/tareas/task-store';
import { TaskForm } from './shared/ui/task-form/task-form';
import { TaskItem } from './shared/ui/task-item/task-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskItem, TaskForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Lista de pendientes';

  store = inject(TaskStore);
}
