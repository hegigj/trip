import {Component, inject, OnDestroy, OnInit, output, signal} from '@angular/core';
import {storageConfig} from '../../../core/configs/storage.config';
import dayjs from 'dayjs';
import {TripService} from '../../services/trip.service';

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
  private readonly tripService = inject(TripService);

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
    const unavailableUntil = dayjs().endOf('day').toISOString();
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
      this.disabled.set(true);
    } else {
      this.disabled.set(false);
      localStorage.removeItem(storageConfig.getTripOfTheDayUnavailableUntil);
      this.tripService.removeStoredTripOfTheDay();
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

    const availableAt = dayjs(unavailableUntil);

    const updateAvailableIn = () => {
      const now = dayjs();

      if (availableAt.isBefore(now)) {
        this.disabled.set(false);

        localStorage.removeItem(storageConfig.getTripOfTheDayUnavailableUntil);
        this.tripService.removeStoredTripOfTheDay();

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
