// src/app/state/effects/task.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskActions } from '../actions/task.actions'; // Importa el grupo de acciones
import { map, catchError, of, switchMap } from 'rxjs';
import { TaskService } from '../service/task.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks), // Usa TaskActions
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })), // Usa TaskActions
          catchError(error => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  );
}
