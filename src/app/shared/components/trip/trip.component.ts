import {Component, computed, input, output} from '@angular/core';
import {TripDto} from '../../../core/dto/trip.dto';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'trip',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './trip.component.html',
  host: {
    'class': 'p-2 flex gap-4 cursor-pointer',
    '(click)': 'goToTripDetails()',
  }
})
export class TripComponent {
  public trip = input.required<TripDto>();
  public showDetails = input<boolean>(false);
  public navigateToTripDetails = output<string>();

  protected tripTags = computed(() => this.trip().tags)

  protected goToTripDetails(): void {
    if (this.showDetails()) {
      this.navigateToTripDetails.emit(this.trip().id);
    }
  }
}
