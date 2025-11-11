import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apiConfig} from '../config/api.config';
import {environment} from '../../../environments/environment.development';
import {PageOf} from '../dto/page-of.dto';
import {TripDto} from '../dto/trip.dto';
import {TripQueryDto} from '../dto/trip-query.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiTripService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiTrip = apiConfig(environment.api.version).trips;

  public getTrips(query: TripQueryDto = { page: 1, limit: 10 }): Observable<PageOf<TripDto>> {
    let params: HttpParams = new HttpParams();

    for (const key in query) {
      const queryKey = key as keyof TripQueryDto;

      if (query[queryKey] !== undefined) {
        if (queryKey === 'tags') {
          params = params.append(queryKey, (query.tags as string[]).join(','));
        } else {
          params = params.append(queryKey, query[queryKey]);
        }
      }
    }

    return this.httpClient.get<PageOf<TripDto>>(this.apiTrip.get(), { params });
  }

  public getTrip(): Observable<TripDto>;
  public getTrip(tripId: string): Observable<TripDto>;
  public getTrip(tripId?: string): Observable<TripDto> {
    return this.httpClient.get<TripDto>(
      tripId
        ? this.apiTrip.getOne(tripId)
        : this.apiTrip.getRandom()
    );
  }
}
