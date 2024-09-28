import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { TaskActions } from 'src/app/state/actions/task.actions';
import { AssociatedPerson, Task } from 'src/app/state/models/task.model';
import { selectTaskState } from 'src/app/state/selector/task.selectors';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let store: Store;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TaskFormComponent
      ],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fb = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add person', () => {
    component.addPerson();
    expect(component.associatedPersons.length).toBe(2);
  });

  it('should remove person', () => {
    component.addPerson();
    component.removePerson(0);
    expect(component.associatedPersons.length).toBe(1);
  });

  it('should add skill', () => {
    component.addSkill(0);
    expect(component.getSkills(0).length).toBe(2);
  });

  it('should remove skill', () => {
    component.addSkill(0);
    component.removeSkill(0, 0);
    expect(component.getSkills(0).length).toBe(1);
  });



});
