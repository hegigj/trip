import {inject, Injectable} from '@angular/core';
import {ApiTripService} from '../../core/apis/api-trip.service';
import {TripQueryDto} from '../../core/dto/trip-query.dto';
import {ISearchQuery} from '../interfaces/search-query.interface';
import {IPaginator} from '../interfaces/paginator.interface';
import {Observable} from 'rxjs';
import {TripDto} from '../../core/dto/trip.dto';
import {PageOf} from '../../core/dto/page-of.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {storageConfig} from '../../core/configs/storage.config';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly apiTripService = inject(ApiTripService);
  private tripsQuery: TripQueryDto = { page: 1, limit: 10 };

  public updateTripQueryWithSearchQuery(searchQuery: Partial<ISearchQuery> | null): void {
    if (searchQuery) {
      this.tripsQuery = {
        ...this.tripsQuery,
        ...Object.entries(searchQuery).reduce(
          (acc, [key, value]) => {
            switch (key) {
              case 'title':
                return { ...acc, titleFilter: value };
              default:
                return { ...acc, [key]: value };
            }
          },
          {}
        )
      };
    } else {
      this.tripsQuery = {
        ...this.tripsQuery,
        ...Object.keys(this.tripsQuery).reduce(
          (acc, key) => {
            switch (key) {
              case 'title':
                return { ...acc, titleFilter: undefined };
              case 'sortBy':
              case 'sortOrder':
              case 'minPrice':
              case 'maxPrice':
              case 'minRating':
                return { ...acc, [key]: undefined };
              default:
                return acc;
            }
          },
          {}
        )
      }
    }

    this.storeTripQuery();
  }

  public updateTripQueryWithPaginatorValues(paginatorValues: IPaginator): void {
    const { page, limit } = paginatorValues;

    this.tripsQuery = {
      ...this.tripsQuery,
      page,
      limit
    };

    this.storeTripQuery();
  }

  public getTrips(): Observable<PageOf<TripDto>> {
    return this.apiTripService.getTrips(this.tripsQuery);
  }

  public getTripOfTheDay(): Observable<TripDto> {
    return this.apiTripService.getTrip();
  }

  public getTripDetails(tripId: string): Observable<TripDto> {
    return this.apiTripService.getTrip(tripId);
  }

  public navigateToTripDetails(router: Router, route: ActivatedRoute, tripId: string): void {
    router.navigate([tripId], { relativeTo: route });
  }

  public navigateBackToTrips(router: Router, route: ActivatedRoute): void {
    router.navigate(['..'], { relativeTo: route });
  }

  public getSearchQuery(): Partial<ISearchQuery> {
    return Object.entries(this.tripsQuery)
      .filter(([key]) => !['page', 'limit'].includes(key))
      .reduce(
        (acc, [key, value]) => {
          switch (key) {
            case 'titleFilter':
              return { ...acc, title: value };
            case 'sortBy':
            case 'sortOrder':
            case 'minPrice':
            case 'maxPrice':
            case 'minRating':
              return { ...acc, [key]: value };
            default:
              return acc;
          }
        },
        {}
      );
  }

  public getPaginatorValues(): IPaginator {
    const { page, limit } = this.tripsQuery;

    return {
      page,
      limit
    }
  }

  private storeTripQuery(): void {
    localStorage.setItem(storageConfig.tripsSearchQuery, JSON.stringify(this.tripsQuery));
  }
}
