import {TripDto} from './trip.dto';
import {SortOrder} from '../../shared/types/sort-order.type';

export interface TripQueryDto {
  sortBy?: keyof Pick<TripDto, 'title' | 'price' | 'rating' | 'creationDate'>;
  sortOrder?: SortOrder;
  titleFilter?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  tags?: string[];
  page: number;
  limit: number;
}
