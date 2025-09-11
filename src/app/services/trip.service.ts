import { inject, Injectable } from '@angular/core';
import { CreateTrip, Trip, UpdateTrip } from '../../types';
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

  getDestinations() {
    return this.http.get<{ idx: number, zone: string }[]>(this.config.API_ENDPOINT + "/trip/destinations");
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

  create(trip: CreateTrip) {
    return this.http.post(this.config.API_ENDPOINT + "/trip", trip);
  }

  update(id: number, trip: UpdateTrip) {
    return this.http.put(this.config.API_ENDPOINT + `/trip/${id}`, trip);
  }
}
