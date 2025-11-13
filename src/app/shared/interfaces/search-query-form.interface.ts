import {FormControl} from '@angular/forms';
import {TripDto} from '../../core/dto/trip.dto';
import {SortOrder} from '../types/sort-order.type';

export interface ISearchQueryForm {
  title: FormControl<string | null>;
  sortBy: FormControl<(keyof Pick<TripDto, 'title' | 'price' | 'rating' | 'creationDate'>) | null>;
  sortOrder: FormControl<SortOrder | null>;
  minPrice: FormControl<number | null>;
  maxPrice: FormControl<number | null>;
  minRating: FormControl<number | null>;
}
