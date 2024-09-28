// src/app/store/selectors/task.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../models/task.model';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);
