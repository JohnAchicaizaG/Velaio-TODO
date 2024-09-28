// src/app/store/actions/task.actions.ts
import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Task } from '../models/task.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: ReadonlyArray<Task> }>(),
    'Add Task': props<{ task: Task }>(),
    'Filter Tasks': props<{ check: boolean }>(),
    'Update Task': props<{ task: Task }>(),
    'Load Tasks Failure': props<{ error: any }>(),
  },
});
