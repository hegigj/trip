import {Component, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ISearchQueryForm} from '../../shared/interfaces/search-query-form.interface';
import {ISearchQuery} from '../../shared/interfaces/search-query.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs';
import {CustomSelect} from '../../shared/components/custom-select/custom-select';
import {ISelectOption} from '../../shared/interfaces/select-option.interface';

@Component({
  selector: 'trip-search',
  imports: [
    ReactiveFormsModule,
    CustomSelect,
  ],
  templateUrl: './trip-search.html'
})
export class TripSearch implements OnInit {
  public searchQuery = output<Partial<ISearchQuery> | null>();

  protected readonly searchQueryForm: FormGroup = new FormGroup<ISearchQueryForm>({
    title: new FormControl(null),
    sortBy: new FormControl(null),
    sortOrder: new FormControl('ASC'),
    minPrice: new FormControl(null),
    maxPrice: new FormControl(null),
    minRating: new FormControl(null, [Validators.min(1), Validators.max(5)])
  });

  protected readonly sortByOptions: ISelectOption[] = [
    { label: 'Title', value: 'title' },
    { label: 'Price', value: 'price' },
    { label: 'Rating', value: 'rating' },
    { label: 'Creation Date', value: 'creationDate' },
  ];
  protected readonly sortOrderOptions: ISelectOption[] = [
    { label: 'Ascending', value: 'ASC' },
    { label: 'Descending', value: 'DESC' },
  ]

  protected readonly showResetButton = signal<boolean>(false);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchQueryForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(this.distinctFormValues),
        filter(this.skipMinRatingInvalidValues),
        tap(searchQuery => {
          console.log(searchQuery);

          // show reset button check
          this.showResetButton.set(
            !Object.entries(searchQuery).every(([_, value]) => value === null)
          );

          // emit search query
          if (this.showResetButton()) {
            this.searchQuery.emit(
              Object.entries(searchQuery)
                .filter(([_, value]) => value !== null)
                .reduce(
                  (acc, [key, value]) => ({ ...acc, [key]: value }),
                  {}
                )
            );
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected resetSearchQuery(): void {
    this.searchQueryForm.reset({
      title: null,
      sortBy: null,
      sortOrder: null,
      minPrice: null,
      maxPrice: null,
      minRating: null
    });

    this.searchQuery.emit(null);
  }

  private skipMinRatingInvalidValues({ minRating }: ISearchQuery): boolean {
    if (minRating === null) {
      return true;
    }

    return minRating >= 1 && minRating <= 5;
  }

  private distinctFormValues(prev: ISearchQuery, curr: ISearchQuery): boolean {
    return !(
      prev.title !== curr.title ||
      prev.sortBy !== curr.sortBy ||
      prev.sortOrder !== curr.sortOrder ||
      prev.minPrice !== curr.minPrice ||
      prev.maxPrice !== curr.maxPrice ||
      prev.minRating !== curr.minRating
    );
  }
}
