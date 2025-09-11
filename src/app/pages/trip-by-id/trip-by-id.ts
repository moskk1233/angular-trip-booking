import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../../types';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-trip',
  imports: [MatIconModule, DecimalPipe],
  templateUrl: './trip-by-id.html',
  styleUrl: './trip-by-id.css'
})
export class TripById implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private tripService = inject(TripService);

  trip = signal<Trip | null>(null);
  isImageLoading = signal(false);

  onImageLoad() {
    this.isImageLoading.set(false);
  }

  ngOnInit(): void {
    this.isImageLoading.set(true);
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    const idInt = parseInt(id);
    if (isNaN(idInt)) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.tripService.getTrip(idInt).subscribe({
      next: (data) => {
        this.trip.set(data);
      },
      error: (err) => {
        this.router.navigate(['/not-found']);
        return;
      }
    });
  }
}
