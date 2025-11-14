import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TripService} from '../services/trip.service';
import {TripDto} from '../../core/dto/trip.dto';

export const tripDetailsResolver: ResolveFn<TripDto | null> = (route) => {
  const router = inject(Router);
  const tripService = inject(TripService);

  if (route.paramMap.has('TRIP_ID')) {
    const tripId = route.paramMap.get('TRIP_ID') as string;

    return tripService.getTripDetails(tripId);
  }

  router.navigate(['/']);

  return null;
};
