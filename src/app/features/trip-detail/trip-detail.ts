import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TripDto} from '../../core/dto/trip.dto';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {map, tap} from 'rxjs';
import {TripComponent} from '../../shared/components/trip/trip.component';

@Component({
  selector: 'trip-detail',
  imports: [
    TripComponent
  ],
  templateUrl: './trip-detail.html',
})
export class TripDetail implements OnInit {
  protected trip = signal<TripDto | null>(null);

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => {
          const { tripDetails } = data as { tripDetails: TripDto | null };
          return tripDetails;
        }),
        tap(tripDetails => this.trip.set(tripDetails)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected getTrip(trip: TripDto | null): TripDto {
    return trip as TripDto;
  }
}
