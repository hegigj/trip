import { TestBed } from '@angular/core/testing';

import { ApiTripService } from './api-trip.service';

describe('ApiTripService', () => {
  let service: ApiTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
