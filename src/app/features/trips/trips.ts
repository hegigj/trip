import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TripSearch} from '../trip-search/trip-search';
import {Paginator} from '../../shared/components/paginator/paginator';
import {TripDto} from '../../core/dto/trip.dto';
import {ISearchQuery} from '../../shared/interfaces/search-query.interface';
import {IPaginator} from '../../shared/interfaces/paginator.interface';
import {TripService} from '../../shared/services/trip.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TripComponent} from '../../shared/components/trip/trip.component';

@Component({
  selector: 'trips',
  imports: [
    TripSearch,
    Paginator,
    TripComponent
  ],
  templateUrl: './trips.html',
  styles: ``,
})
export class Trips implements OnInit {
  protected trips = signal<TripDto[]>([]);
  protected totalTrips = signal<number>(10);
  protected storedSearchQuery = signal<Partial<ISearchQuery> | undefined>(undefined);

  protected readonly limitOptions = [10, 20, 30, 50, 100];

  private readonly tripService = inject(TripService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected tripOfTheDay = computed(() => this.tripService.tripOfTheDay());

  ngOnInit(): void {
    this.getTrips();
    this.storedSearchQuery.set(this.tripService.getSearchQuery());
  }

  protected searchQueryHandler(searchQuery: Partial<ISearchQuery> | null): void {
    this.tripService.updateTripQueryWithSearchQuery(searchQuery);
    this.getTrips();
  }

  protected paginatorChangeHandler(paginatorValues: IPaginator): void {
    this.tripService.updateTripQueryWithPaginatorValues(paginatorValues);
    this.getTrips();
  }

  protected navigateToTripDetails(tripId: string): void {
    this.tripService.navigateToTripDetails(this.router, this.route, tripId);
  }

  protected getTrip(trip: TripDto | null): TripDto {
    return trip as TripDto;
  }

  private getTrips(): void {
    this.tripService.getTrips().subscribe({
      next: pageOfTrips => {
        this.trips.set(pageOfTrips.items);
        this.totalTrips.set(pageOfTrips.total);
      }
    });
  }
}
