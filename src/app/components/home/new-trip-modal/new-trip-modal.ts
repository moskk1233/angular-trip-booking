import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from "../../shared/dialog/footer/footer";
import { Dialog } from "../../shared/dialog/dialog";
import { Content } from "../../shared/dialog/content/content";
import { ModalState } from '../../../services/home/modal-state';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Config } from '../../../config';
import { TripService } from '../../../services/trip.service';

interface Destination {
  value: number;
  name: string;
}

interface Country {
  name: string;
}

@Component({
  selector: 'app-new-trip-modal',
  imports: [Footer, MatIconModule, Dialog, Content, FormsModule],
  templateUrl: './new-trip-modal.html',
  styleUrl: './new-trip-modal.css'
})
export class NewTripModal {
  private modalState = inject(ModalState);
  private tripService = inject(TripService);

  destinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  countries: Country[] = [
    { name: 'ประเทศไทย' },
    { name: 'สวิตเซอร์แลนด์' },
    { name: 'สิงคโปร์' },
    { name: 'เวียดนาม' },
    { name: 'ลาว' },
    { name: 'ไอซ์แลนด์' },
    { name: 'เยอรมันนี' },
    { name: 'อินเดีย' },
  ]

  name = signal('');
  detail = signal('');
  price = signal(0);
  coverImage = signal('');
  country = signal('');
  zone = signal('');
  duration = signal(0);

  isNewTripOpen = computed(() => this.modalState.isNewTripOpen());

  onNewTripCancel() {
    this.modalState.setNewTrip(false);
  }

  onAddTrip() {
    if (!this.checkRequireField()) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      });
      return;
    }

    const payload = {
      name: this.name(),
      country: this.country(),
      destinationid: parseInt(this.zone()),
      coverimage: this.coverImage(),
      detail: this.detail(),
      price: this.price(),
      duration: this.duration()
    };

    this.tripService.create(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถเพิ่มข้อมูลได้'
        });
      }
    });
    this.modalState.setNewTrip(false);
  }

  private checkRequireField() {
    return !!this.name() &&
      !!this.detail() &&
      !!this.price() &&
      !!this.coverImage() &&
      !!this.country() &&
      !!this.zone() &&
      !!this.duration()
  }
}
