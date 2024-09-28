import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { TaskFormComponent } from './features/task/components/task-form/task-form.component';
import { TaskListComponent } from "./features/task/components/task-list/task-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    TaskFormComponent,
    TaskListComponent
]
})
export class AppComponent {

}
