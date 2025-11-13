import {Component, signal} from '@angular/core';
import {GetTripOfTheDayButton} from '../get-trip-of-the-day-button/get-trip-of-the-day-button';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    GetTripOfTheDayButton
  ],
  templateUrl: './toolbar.component.html',
  host: {
    'class': 'flex p-4 justify-between items-center bg-slate-100',
  }
})
export class ToolbarComponent {
  protected navigationBackButtonVisibility = signal<boolean>(false);
  protected shareButtonVisibility = signal<boolean>(false);
}
