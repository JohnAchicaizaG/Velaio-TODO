import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', () => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks[0].nameTask).toBe('Prueba Técnica');
      expect(tasks[1].nameTask).toBe('Lectura');
    });
  });

  it('should add task', () => {
    const newTask: Task = {
      id: 3,
      check: true,
      nameTask: 'Nueva Tarea',
      endDate: '2024-12-31',
      associatedPersons: []
    };
    service.addTask(newTask);
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(3);
      expect(tasks[2].nameTask).toBe('Nueva Tarea');
    });
  });

  it('should not add duplicate task', () => {
    const existingTask: Task = {
      id: 1,
      check: true,
      nameTask: 'Prueba Técnica',
      endDate: '2024-12-31',
      associatedPersons: []
    };
    service.addTask(existingTask);
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
    });
  });
});
