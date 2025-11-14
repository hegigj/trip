import { Pipe, PipeTransform } from '@angular/core';
import {TripDto} from '../../core/dto/trip.dto';
import {IScoreBadge} from '../interfaces/score-badge.interface';

@Pipe({
  name: 'scoreBadge',
  pure: true,
  standalone: true
})
export class ScoreBadgePipe implements PipeTransform {

  transform({ rating, nrOfRatings, co2 }: TripDto): IScoreBadge {
    const weightRating = .6;
    const weightPopularity = .2;
    const weightEco = .2;

    const ratingScore = (rating / 5);
    const popularityScore = Math.min(nrOfRatings / 100, 1);
    const co2Score = 1 - Math.min(co2 / 200, 1);

    let score =
      ratingScore * weightRating +
      popularityScore * weightPopularity +
      co2Score * weightEco;

    score = Math.round(score * 100);

    let tier: 'Average' | 'Good' | 'Awesome';

    if (score >= 80) {
      tier = 'Awesome';
    } else if (score >= 60) {
      tier = 'Good';
    } else {
      tier = 'Average';
    }

    return { score, tier };
  }
}
