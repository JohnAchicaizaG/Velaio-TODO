import { createReducer, on, Action } from '@ngrx/store';
import { Task } from '../models/task.model';
import { TaskActions } from '../actions/task.actions';

export interface TaskState {
  tasks: Task[];
  filteredTasks: Task[]; // Nuevo estado para las tareas filtradas
}

export const initialTaskState: TaskState = {
  tasks: [],
  filteredTasks: [], // Inicializamos el estado filtrado
};

const _taskReducer = createReducer(
  initialTaskState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
    filteredTasks: [...tasks], // Al cargar tareas, también actualizamos las tareas filtradas
  })),
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    filteredTasks: [...state.filteredTasks, task], // Asegúrate de agregar la nueva tarea a las tareas filtradas
  })),
  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)), // Actualizamos la tarea en el estado
    filteredTasks: state.filteredTasks.map(t => (t.id === task.id ? task : t)), // También actualizamos en las tareas filtradas
  })),
  on(TaskActions.filterTasks, (state, { check }) => ({
    ...state,
    filteredTasks: state.tasks.filter(task => task.check === check), // Filtramos las tareas según el estado check
  }))
);

export function taskReducer(state: TaskState | undefined, action: Action): TaskState {
  return _taskReducer(state, action);
}
