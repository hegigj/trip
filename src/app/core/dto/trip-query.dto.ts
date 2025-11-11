import {TripDto} from './trip.dto';

export interface TripQueryDto {
  sortBy?: keyof Pick<TripDto, 'title' | 'price' | 'rating' | 'creationDate'>;
  sortOrder?: 'ASC' | 'DESC';
  titleFilter?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  tags?: string[];
  page: number;
  limit: number;
}
