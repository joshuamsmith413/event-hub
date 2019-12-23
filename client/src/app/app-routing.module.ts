import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { EventNewComponent } from './event-new/event-new.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  { 
    path: 'events',
    component: EventsComponent 
  },
  {
    path: 'special',
    component: SpecialEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'event/new',
    component: EventNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
