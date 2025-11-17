import { ScoreBadgePipe } from './score-badge.pipe';

describe('ScoreBadgePipe', () => {
  let pipe: ScoreBadgePipe;

  beforeEach(() => {
    pipe = new ScoreBadgePipe();
  });

  it('should calculate AWESOME tier when score >= 80', () => {
    const trip: any = {
      rating: 4.8,
      nrOfRatings: 200,
      co2: 20
    };

    const result = pipe.transform(trip);

    expect(result.tier).toBe('Awesome');
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it('should calculate GOOD tier when score >= 60 and < 80', () => {
    const trip: any = {
      rating: 4.0,
      nrOfRatings: 60,
      co2: 120
    };

    const result = pipe.transform(trip);

    expect(result.tier).toBe('Good');
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.score).toBeLessThan(80);
  });

  it('should calculate AVERAGE tier when score < 60', () => {
    const trip: any = {
      rating: 3.0,
      nrOfRatings: 10,
      co2: 150
    };

    const result = pipe.transform(trip);

    expect(result.tier).toBe('Average');
    expect(result.score).toBeLessThan(60);
  });

  it('should correctly compute score based on formula', () => {
    const trip: any = {
      rating: 5,
      nrOfRatings: 100,
      co2: 0
    };

    const result = pipe.transform(trip);

    expect(result.score).toBe(100);
    expect(result.tier).toBe('Awesome');
  });
});
