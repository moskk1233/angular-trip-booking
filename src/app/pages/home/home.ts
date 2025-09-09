import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripCard } from "../../components/home/trip-card/trip-card";
import { TripService } from '../../services/trip.service';
import { Trip } from '../../../types';
import { EditModeService } from '../../services/edit-mode.service';
import Swal from 'sweetalert2';

interface Destination {
  name: string;
}

@Component({
  selector: 'app-home',
  imports: [MatIconModule, TripCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  tripService = inject(TripService);
  editModeService = inject(EditModeService);
  snackBar = inject(MatSnackBar);

  trips = signal<Trip[]>([]);
  searchId = signal('');
  tripName = signal('');
  selectedDestination = signal('');

  isEditMode = computed(() => this.editModeService.isEditMode());

  destinations: Destination[] = [
    { name: 'เอเชีย' },
    { name: 'ยุโรป' },
    { name: 'เอเชียตะวันออกเฉียงใต้' },
    { name: 'ประเทศไทย' },
  ];

  ngOnInit(): void {
    this.fetchAllTrip();
  }

  fetchAllTrip() {
    this.tripService.getTrips().subscribe((data) => {
      this.trips.set(data);
    });
  }

  searchTripByName() {
    if (!this.tripName()) {
      this.fetchAllTrip();
      return;
    }

    this.tripService.searchTripName(this.tripName()).subscribe((data) => {
      this.trips.set(data);
    });
  }

  searchTripById() {
    if (!this.searchId()) {
      this.fetchAllTrip();
      return;
    }

    const id = parseInt(this.searchId(), 10);
    if (isNaN(id)) {
      this.trips.set([]);
      return;
    }

    this.tripService.getTrip(id).subscribe({
      next: (trip) => {
        if (trip)
          this.trips.set([trip]);
        else
          this.trips.set([]);
      },
      error: () => {
        this.trips.set([]);
      }
    });
  }

  searchByDestination() {
    const dest = this.selectedDestination();
    if (!dest) {
      this.fetchAllTrip();
      return;
    }

    this.tripService.getTrips().subscribe((data) => {
      const filtered = data.filter(trip => trip.destination_zone === dest);
      this.trips.set(filtered);
    });
  }

  async onDelete(tripId: number) {
    const swalRes = await Swal.fire({
      icon: 'warning',
      title: 'ต้องการลบข้อมูลทริปนี้หรือไม่ ?',
      showCancelButton: true
    });

    if (!swalRes.isConfirmed) return;

    this.tripService.delete(tripId).subscribe({
      next: () => {
        this.snackBar.open('ลบสำเร็จ!');
        this.trips.update(v => v.filter((val) => val.idx !== tripId));
      },
      error: () => {
        this.snackBar.open('เกิดข้อมูลผิดพลาด!');
      }
    })
  }
}
