import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { TaskActions } from 'src/app/state/actions/task.actions';
import { Task } from 'src/app/state/models/task.model';
import { selectTaskState } from 'src/app/state/selector/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TaskListComponent implements OnInit {
  private store = inject(Store);

  // Define un observable para la lista de tareas
  tasks$: Observable<Task[]> = new Observable();

  // Almacena el filtro actual de las tareas, por defecto 'all'
  filter: 'all' | 'completed' | 'pending' = 'all';


  /**
 * Método que se ejecuta cuando el componente es inicializado.
 * Carga las tareas del estado y aplica el filtro correspondiente.
 *
 * @returns {void}
 */
  ngOnInit(): void {
    this.loadTasks();
    this.tasks$ = this.store.select(selectTaskState).pipe(
      map(state => this.filterTasks(state.tasks))
    );
  }

  /**
 * Método para cargar las tareas desde el store.
 * Despacha una acción que carga las tareas actuales en la aplicación.
 *
 * @returns {void}
 */
  loadTasks() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  /**
 * Método privado para filtrar las tareas según el filtro actual ('all', 'completed', 'pending').
 * Devuelve una lista de tareas filtrada de acuerdo al estado de completado.
 *
 * @param {Task[]} tasks - La lista de tareas a filtrar.
 * @returns {Task[]} - La lista de tareas filtrada.
 */
  private filterTasks(tasks: Task[]): Task[] {
    switch (this.filter) {
      case 'completed':
        return tasks.filter(task => task.check);
      case 'pending':
        return tasks.filter(task => !task.check);
      default:
        return tasks;
    }
  }


  /**
 * Método para cambiar el filtro de visualización de tareas.
 * Actualiza el filtro de tareas ('all', 'completed', 'pending') y vuelve a aplicar el filtro.
 *
 * @param {'all' | 'completed' | 'pending'} newFilter - El nuevo filtro seleccionado.
 * @returns {void}
 */
  changeFilter(newFilter: 'all' | 'completed' | 'pending') {
    this.filter = newFilter;
    this.tasks$ = this.store.select(selectTaskState).pipe(
      map(state => this.filterTasks(state.tasks))
    );
  }


  /**
 * Método para actualizar el estado de una tarea (completada o pendiente).
 * Cambia el estado de la propiedad 'check' de la tarea y despacha una acción para actualizarla en el store.
 *
 * @param {Task} task - La tarea cuya propiedad 'check' debe actualizarse.
 * @returns {void}
 */
  updateTaskStatus(task: Task) {
    const updatedTask = { ...task, check: !task.check };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

}
