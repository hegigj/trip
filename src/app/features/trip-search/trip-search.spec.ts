import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSearch } from './trip-search';

describe('TripSearch', () => {
  let component: TripSearch;
  let fixture: ComponentFixture<TripSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
