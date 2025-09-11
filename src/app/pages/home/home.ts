import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripCard } from "../../components/home/trip-card/trip-card";
import { TripService } from '../../services/trip.service';
import { CreateTrip, Trip, UpdateTrip } from '../../../types';
import { EditModeService } from '../../services/edit-mode.service';
import Swal from 'sweetalert2';
import { ModalState } from '../../services/home/modal-state';
import { NewTripModal } from "../../components/home/new-trip-modal/new-trip-modal";
import { EditTripModal } from "../../components/home/edit-trip-modal/edit-trip-modal";

interface Destination {
  name: string;
}

@Component({
  selector: 'app-home',
  imports: [MatIconModule, TripCard, FormsModule, NewTripModal, EditTripModal],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  tripService = inject(TripService);
  editModeService = inject(EditModeService);
  modalState = inject(ModalState);
  snackBar = inject(MatSnackBar);

  trips = signal<Trip[]>([]);
  searchId = signal('');
  tripName = signal('');
  selectedDestination = signal('');
  existedTripData = signal<Trip>({
    idx: 0,
    country: '',
    coverimage: '',
    destination_zone: '',
    detail: '',
    duration: 0,
    name: '',
    price: 0
  });

  isEditTripOpen = computed(() => this.modalState.isEditTripOpen());
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

  onEdit(tripId: number) {
    this.tripService.getTrip(tripId).subscribe({
      next: (data) => {
        if (!data) {
          this.snackBar.open('ไม่พบข้อมูลทริป');
          return;
        }

        this.existedTripData.set(data);
        console.log(data);
        this.modalState.toggleEditModal();
      },
      error: () => {
        this.snackBar.open('เกิดข้อมูลผิดพลาด!');
      }
    })
  }

  handleAddTripSubmitted(trip: CreateTrip) {
    this.tripService.create(trip).subscribe({
      next: () => {
        this.snackBar.open('เพิ่มข้อมูลสำเร็จ');
      },
      error: () => {
        this.snackBar.open('เกิดข้อผิดพลาด!');
      }
    });
    this.modalState.setNewTrip(false);
  }

  handleEditSubmitted(trip: Trip) {
    let destinations: { idx: number, zone: string }[] = [];
    this.tripService.getDestinations().subscribe({
      next: (data) => {
        destinations = data
        const payload: UpdateTrip = {
          ...trip,
          destinationid: destinations.find((destination) => destination.zone === trip.destination_zone)?.idx
        };

        this.tripService.update(trip.idx, payload).subscribe({
          next: () => {
            this.snackBar.open('แก้ไขสำเร็จ')
            this.modalState.setEditTrip(false);
          },
          error: () => this.snackBar.open('เกิดข้อมูลผิดพลาด!')
        });
      },
      error: () => {
        this.snackBar.open('เกิดข้อมูลผิดพลาด!');
      }
    })
  }
}
