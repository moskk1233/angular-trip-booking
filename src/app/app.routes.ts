import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "trips/:id",
    loadComponent: () => import('./pages/trip-by-id/trip-by-id').then(m => m.TripById)
  },
  {
    path: "not-found",
    component: NotFound
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];
