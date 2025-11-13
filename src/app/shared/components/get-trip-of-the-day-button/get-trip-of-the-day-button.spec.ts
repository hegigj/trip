import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTripOfTheDayButton } from './get-trip-of-the-day-button';

describe('GetTripOfTheDayButton', () => {
  let component: GetTripOfTheDayButton;
  let fixture: ComponentFixture<GetTripOfTheDayButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTripOfTheDayButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTripOfTheDayButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
