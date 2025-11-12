import {environment} from '../../../environments/environment.development';

const baseUrl: string = environment.api.baseUrl;
type ApiConfigVersion = 'v1' | 'v2' | string;

export const apiConfig = (version: ApiConfigVersion) => {
  return {
    trips: {
      get: () => `${baseUrl}/${version}/trips`,
      getOne: (tripId: string) => `${baseUrl}/${version}/trips/${tripId}`,
      getRandom: () => `${baseUrl}/${version}/trips/random/trip-of-the-day`,
    }
  }
}
