import { Routes } from '@angular/router';
import {Trips} from './features/trips/trips';
import {TripDetail} from './features/trip-detail/trip-detail';
import {tripDetailsResolver} from './shared/resolvers/trip-details.resolver';

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
        component: TripDetail,
        resolve: {
          tripDetails: tripDetailsResolver
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'trips',
    pathMatch: 'full'
  }
];
