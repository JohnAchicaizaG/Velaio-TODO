import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { taskReducer } from './app/state/reducer/task.reducer';
import { TaskEffects } from './app/state/effects/task.effects';


bootstrapApplication(AppComponent, {
    providers: [provideStore({ task: taskReducer }), provideEffects([TaskEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
})
  .catch(err => console.error(err));
