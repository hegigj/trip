import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, tap} from 'rxjs';

@Component({
  selector: 'root',
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected backButtonVisibility = signal<boolean>(false);
  protected shareButtonVisibility = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(event => {
          const isUrlInTripDetails = event.url.match(/\/trips\/[a-zA-Z0-9\-]+/gi)
          const isInTripDetails = !!isUrlInTripDetails;

          this.backButtonVisibility.set(isInTripDetails);
          this.shareButtonVisibility.set(isInTripDetails);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }
}
