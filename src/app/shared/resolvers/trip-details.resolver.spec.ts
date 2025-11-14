import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tripDetailsResolver } from './trip-details.resolver';
import {TripDto} from '../../core/dto/trip.dto';

describe('tripDetailsResolver', () => {
  const executeResolver: ResolveFn<TripDto | null> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => tripDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
