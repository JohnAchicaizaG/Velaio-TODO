// src/app/store/services/task.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      check: true,
      nameTask: 'Prueba Técnica',
      endDate: '2024-12-31',
      associatedPersons: [{ fullName: 'John Alexander Chicaiza', age: 32, skills: ['JavaScript','Typescript', 'Angular', 'React', 'Java', 'Docker', 'Astro' ,'Nest', 'Express' ] }],
    },
    {
      id: 2,
      check: false,
      nameTask: 'Lectura',
      endDate: '2024-11-30',
      associatedPersons: [{ fullName: 'Alejandro Chicaiza', age: 4, skills: ['lectura', 'dibujo', 'pintura', 'música'] }, { fullName: 'Mayerlin Yandar', age: 27, skills: ['culinaria', 'arte', 'belleza'] }],
    },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): void {
    if (!this.tasks.find((t) => t.id === task.id)) {
      this.tasks.push(task);
    }
  }
}
