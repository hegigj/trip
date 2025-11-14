import {Component, inject, input} from '@angular/core';
import {GetTripOfTheDayButton} from '../get-trip-of-the-day-button/get-trip-of-the-day-button';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment.development';

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
  public navigationBackButtonVisibility = input<boolean>(false);
  public shareButtonVisibility = input<boolean>(false);

  private readonly router = inject(Router);

  protected navigateBack(): void {
    this.router.navigate(['/']);
  }

  protected share(): void {
    if (navigator) {
      navigator.clipboard.writeText(environment.uri.host + this.router.url);
    }
  }
}
