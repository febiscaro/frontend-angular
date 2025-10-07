import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { TicketsListComponent } from './pages/tickets-list/tickets-list';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tickets', component: TicketsListComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
