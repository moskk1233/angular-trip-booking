export interface Trip {
    idx:              number;
    name:             string;
    country:          string;
    coverimage:       string;
    detail:           string;
    price:            number;
    duration:         number;
    destination_zone: string;
}

export interface CreateTrip {
  name:             string;
  country:          string;
  coverimage:       string;
  detail:           string;
  price:            number;
  duration:         number;
  destinationid:    number;
}

export interface UpdateTrip extends Partial<CreateTrip> {}
