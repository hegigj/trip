import {Component, input, output} from '@angular/core';
import {TripDto} from '../../../core/dto/trip.dto';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'trip',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './trip.component.html',
  host: {
    'class': 'p-2 flex gap-4 cursor-pointer',
    '(click)': 'goToTripDetails()',
  }
})
export class TripComponent {
  public trip = input.required<TripDto>();
  public navigateToTripDetails = output<string>();

  protected goToTripDetails(): void {
    this.navigateToTripDetails.emit(this.trip().id);
  }
}
