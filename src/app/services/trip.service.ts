import { inject, Injectable } from '@angular/core';
import { Trip } from '../../types';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private http = inject(HttpClient);
  private config = inject(Config);

  getTrips() {
    return this.http.get<Trip[]>(this.config.API_ENDPOINT + "/trip");
  }

  searchTripName(name: string) {
    return this.http.get<Trip[]>(this.config.API_ENDPOINT + `/trip/search/fields?name=${name}`);
  }

  getTrip(id: number) {
    return this.http.get<Trip | null>(this.config.API_ENDPOINT + `/trip/${id}`);
  }

  delete(id: number) {
    return this.http.delete(this.config.API_ENDPOINT + `/trip/${id}`);
  }
}
