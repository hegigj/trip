import {TripDto} from '../../core/dto/trip.dto';
import {SortOrder} from '../types/sort-order.type';

export interface ISearchQuery {
  title: string | null;
  sortBy: (keyof Pick<TripDto, 'title' | 'price' | 'rating' | 'creationDate'>) | null;
  sortOrder: SortOrder | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
}
