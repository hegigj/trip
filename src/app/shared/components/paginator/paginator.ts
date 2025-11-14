import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {distinctUntilChanged, tap} from 'rxjs';
import {CustomSelect} from '../custom-select/custom-select';
import {ISelectOption} from '../../interfaces/select-option.interface';
import {IPaginator} from '../../interfaces/paginator.interface';

@Component({
  selector: 'paginator',
  imports: [
    ReactiveFormsModule,
    CustomSelect,
  ],
  templateUrl: './paginator.html',
  host: {
    'class': 'flex gap-2 justify-end items-center'
  }
})
export class Paginator implements OnInit , OnChanges {
  public limitOptions = input<number[]>([10]);
  public totalElements = input.required<number>();
  public paginatorChange = output<IPaginator>();

  protected limitControl = new FormControl<number>(10);
  protected innerLimitOptions = computed<ISelectOption[]>(
    () => this.limitOptions().map(option => ({ label: option.toString(), value: option })),
  );
  protected paginatorResult = signal<string>('');

  private readonly destroyRef = inject(DestroyRef);
  private currentPage: number = 1;
  private selectedLimit: number | null = null;

  ngOnInit(): void {
    this.limitControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(limit => {
          this.selectedLimit = limit;
          this.setPaginatorResult();
          this.emitPaginatorValues();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalElements'].previousValue !== changes['totalElements'].currentValue) {
      console.log(changes);
      this.currentPage = 1;
      this.selectedLimit = this.limitOptions().at(0) ?? 10;
      this.setPaginatorResult();
    }
  }

  private setPaginatorResult(): void {
    if (this.selectedLimit !== null) {
      const start = ((this.currentPage - 1) * this.selectedLimit) + 1;
      let end = this.currentPage * this.selectedLimit;
      if (end > this.totalElements()) {
        end = this.totalElements();
      }

      this.paginatorResult.set(`${start} - ${end} of ${this.totalElements()}`);
    }
  }

  private emitPaginatorValues(): void {
    if (this.selectedLimit !== null) {
      this.paginatorChange.emit({
        page: this.currentPage,
        limit: this.selectedLimit,
      });
    }
  }

  protected previousPage(): void {
    if (this.selectedLimit !== null && this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.setPaginatorResult();
      this.emitPaginatorValues();
    }
  }

  protected nextPage(): void {
    if (
      this.selectedLimit !== null &&
      (this.currentPage * this.selectedLimit) < this.totalElements()
    ) {
      this.currentPage = this.currentPage + 1;
      this.setPaginatorResult();
      this.emitPaginatorValues();
    }
  }
}
