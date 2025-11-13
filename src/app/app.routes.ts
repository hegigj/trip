import { Routes } from '@angular/router';
import {Trips} from './features/trips/trips';
import {TripDetail} from './features/trip-detail/trip-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full',
  },
  {
    path: 'trips',
    children: [
      {
        path: '',
        component: Trips
      },
      {
        path: ':TRIP_ID',
        component: TripDetail
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'trips',
    pathMatch: 'full'
  }
];
