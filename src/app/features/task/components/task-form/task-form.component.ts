import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectTaskState } from 'src/app/state/selector/task.selectors';
import { TaskActions } from 'src/app/state/actions/task.actions';
import { Task } from 'src/app/state/models/task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class TaskFormComponent implements OnInit {

  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private store = inject(Store);

  // Observable que almacenará el estado de las tareas desde el store
  tasks$: Observable<any> = new Observable();


  ngOnInit(): void {
    this.initializeTasksObservable();
  }


  /**
 * Inicializa el observable que selecciona el estado de las tareas desde el store.
 *
 * @returns {void}
 */
  initializeTasksObservable(): void {
    this.tasks$ = this.store.select(selectTaskState);
  }


  // Inicialización del formulario reactivo con los controles y validaciones
  myTask = this.fb.group({
    nameTask: ['', Validators.required],
    endDate: ['', Validators.required],
    associatedPersons: this.fb.array([
      this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(5)]],
        age: ['', [Validators.required, Validators.min(18)]],
        skills: this.fb.array([this.fb.control('', Validators.required)])
      })
    ])
  });


  /**
 * Carga las tareas desde el store.
 * Despacha la acción para cargar las tareas desde la fuente de datos.
 */
  loadTasks() {
    this.store.dispatch(TaskActions.loadTasks());
  }


  /**
 * Getter para acceder al FormArray de personas asociadas.
 *
 * @returns {FormArray} - El FormArray de personas asociadas al formulario.
 */
  get associatedPersons(): FormArray {
    return this.myTask.get('associatedPersons') as FormArray;
  }


  /**
 * Getter para acceder al FormArray de habilidades de una persona específica.
 *
 * @param {number} personIndex - Índice de la persona en el FormArray.
 * @returns {FormArray} - El FormArray de habilidades de la persona.
 */
  getSkills(personIndex: number): FormArray {
    return this.associatedPersons.at(personIndex).get('skills') as FormArray;
  }


  /**
 * Método para añadir una nueva persona al formulario.
 * Crea un nuevo grupo para una persona y lo añade al FormArray de personas asociadas.
 */
  addPerson(): void {
    const newPersonGroup = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });

    // validador de nombre único
    newPersonGroup.setValidators(this.uniqueFullNameValidator(this.associatedPersons.controls));
    this.associatedPersons.push(newPersonGroup);
  }



  /**
 * Método para eliminar una persona del formulario.
 * Elimina el grupo correspondiente a una persona del FormArray de personas asociadas.
 *
 * @param {number} index - El índice de la persona a eliminar en el FormArray.
 * @returns {void}
 */
  removePerson(index: number): void {
    this.associatedPersons.removeAt(index);
  }


  /**
 * Método para añadir una nueva habilidad a una persona específica.
 *
 * @param {number} personIndex - Índice de la persona a la que se le añadirá la habilidad.
 */
  addSkill(personIndex: number): void {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }


  /**
 * Método para eliminar una habilidad específica de una persona.
 *
 * @param {number} personIndex - Índice de la persona de la que se eliminará la habilidad.
 * @param {number} skillIndex - Índice de la habilidad a eliminar.
 */
  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }


  /**
 * Método para manejar el envío del formulario.
 * Verifica si el formulario es válido y, en caso afirmativo, despacha una acción para agregar la nueva tarea.
 */
  onSubmit(): void {
    if (this.myTask.valid) {
      const newTask: Task = {
        id: +this.generateDynamicId(),
        check: false,
        nameTask: this.myTask.value.nameTask ?? '',
        endDate: this.myTask.value.endDate ?? '',
        associatedPersons: (this.myTask.value.associatedPersons || []).map(person => ({
          fullName: person.fullName ?? '',
          age: person.age ? Number(person.age) : 0,
          skills: person.skills ? person.skills.filter(skill => skill !== null && skill !== undefined) as string[] : [] // Manejo de skills undefined
        })),
      };

      this.store.dispatch(TaskActions.addTask({ task: newTask }));
      this.toast()
      this.myTask.reset();
      this.removePerson(0)
    } else {
      console.info('Formulario inválido');
    }
  }

  /**
   * Mensaje de exitoo de la tarea.
   */
  toast() {
    Swal.fire({
      title: 'Éxito!',
      text: 'La tarea se creó con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      background: '#f0f8ff',
      color: '#333',
      confirmButtonColor: '#1F2937',
    });
  }

  /**
 * Genera un ID dinámico de hasta 3 dígitos.
 * @returns {string} - ID con 3 dígitos, incluyendo ceros a la izquierda si es necesario.
 */
  generateDynamicId(): string {
    const id = Math.floor(Math.random() * 1000);
    return id.toString().padStart(3, '0');
  }



  /**
 * Método para verificar si hay habilidades válidas para una persona.
 *
 * @param {number} personIndex - Índice de la persona a verificar.
 * @returns {boolean} - Retorna verdadero si al menos una habilidad es válida.
 */
  hasValidSkills(personIndex: number): boolean {
    const skillsArray = this.getSkills(personIndex);
    return skillsArray.controls.some(skill => skill.valid);
  }


  /**
   * Validador personalizado para verificar si el nombre completo ya existe en una lista de personas asociadas.
   * Este validador compara el valor de 'fullName' de un control con los nombres existentes en la lista de controles.
   *
   * @param {AbstractControl[]} associatedPersons - Lista de controles que representan las personas asociadas.
   * @returns {ValidatorFn} - Devuelve una función de validador que verifica si el nombre completo es duplicado.
   */
  uniqueFullNameValidator(associatedPersons: AbstractControl[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fullName = control.get('fullName')?.value;
      const duplicate = associatedPersons.some((person) => {
        const name = person.get('fullName')?.value;
        return name === fullName && person !== control;
      });

      return duplicate ? { duplicateName: true } : null;
    };
  }

}
