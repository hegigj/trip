import {Component, OnDestroy, OnInit, output, signal} from '@angular/core';
import {storageConfig} from '../../../core/configs/storage.config';
import dayjs from 'dayjs';

@Component({
  selector: 'get-trip-of-the-day-button',
  imports: [],
  templateUrl: './get-trip-of-the-day-button.html',
  styles: `
    @reference "tailwindcss";

    button:disabled:hover {
      span:first-child {
        @apply opacity-50;
      }
      span:last-child {
        @apply -translate-y-4;
      }
    }
  `
})
export class GetTripOfTheDayButton implements OnInit, OnDestroy {
  public getTripOfTheDay = output<void>();

  protected disabled = signal<boolean>(false);
  protected availableIn = signal<string>('');

  private intervalRef?: number;

  ngOnInit(): void {
    this.checkTripOfTheDayAvailability();
    this.updateAvailabilityCount();
  }

  ngOnDestroy(): void {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  protected getTripOfTheDayHandler(): void {
    console.log('getTripOfTheDayHandler');
    const unavailableUntil = dayjs().add(1, 'minute').toISOString();
    localStorage.setItem(storageConfig.getTripOfTheDayUnavailableUntil, unavailableUntil);

    this.checkTripOfTheDayAvailability(unavailableUntil);
    this.updateAvailabilityCount(unavailableUntil);

    this.getTripOfTheDay.emit();
  }

  private checkTripOfTheDayAvailability(
    unavailableUntil = localStorage.getItem(storageConfig.getTripOfTheDayUnavailableUntil)
  ): void {
    const now = dayjs();

    if (unavailableUntil && dayjs(unavailableUntil).isAfter(now)) {
      console.log('getTripOfTheDayAvailable');
      this.disabled.set(true);
    } else {
      console.log('getTripOfTheDayDisabled');
      this.disabled.set(false);
      localStorage.removeItem(storageConfig.getTripOfTheDayUnavailableUntil);
    }
  }

  private updateAvailabilityCount(
    unavailableUntil = localStorage.getItem(storageConfig.getTripOfTheDayUnavailableUntil)
  ): void {
    if (!this.disabled()) {
      return;
    }

    if (!unavailableUntil) {
      this.disabled.set(false);
      return;
    }

    const now = dayjs();
    const availableAt = dayjs(unavailableUntil);

    const updateAvailableIn = () => {
      if (availableAt.isBefore(now)) {
        this.disabled.set(false);
        localStorage.removeItem(storageConfig.getTripOfTheDayUnavailableUntil);

        if (this.intervalRef) {
          clearInterval(this.intervalRef);
        }
      } else {
        const diffMinutes = availableAt.diff(now, 'minute');
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        this.availableIn.set(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      }
    };

    updateAvailableIn();

    this.intervalRef = setInterval(
      () => updateAvailableIn(),
      60 * 1000
    );
  }
}
