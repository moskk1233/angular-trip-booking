import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TripCard } from "../../components/home/trip-card/trip-card";
import { TripService } from '../../services/trip.service';
import { Trip } from '../../../types';
import { EditModeService } from '../../services/edit-mode.service';

interface Destination {
  value: number;
  name: string;
}

@Component({
  selector: 'app-home',
  imports: [MatIconModule, TripCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  tripService = inject(TripService);
  editModeService = inject(EditModeService);

  trips = signal<Trip[]>([]);

  isEditMode = computed(() => this.editModeService.isEditMode());

  destinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  ngOnInit(): void {
    this.tripService.getTrips().subscribe((data) => this.trips.set(data));
  }
}
