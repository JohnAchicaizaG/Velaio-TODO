// src/app/store/models/task.model.ts
export interface Task {
  id: number;
  check:boolean
  nameTask: string;
  endDate: string;
  associatedPersons: AssociatedPerson[];
}

export interface AssociatedPerson {
  fullName: string;
  age: number;
  skills: string[];
}

export interface TaskState {
  tasks: Task[];
}
