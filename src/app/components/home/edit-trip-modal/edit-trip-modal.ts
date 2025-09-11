import { Component, computed, effect, inject, input, output, Renderer2, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from "../../shared/dialog/footer/footer";
import { Dialog } from "../../shared/dialog/dialog";
import { Content } from "../../shared/dialog/content/content";
import { ModalState } from '../../../services/home/modal-state';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TripService } from '../../../services/trip.service';
import { Trip } from '../../../../types';

interface Destination {
  value: number;
  name: string;
}

interface Country {
  name: string;
}

@Component({
  selector: 'app-edit-trip-modal',
  imports: [Footer, MatIconModule, Dialog, Content, FormsModule],
  templateUrl: './edit-trip-modal.html',
  styleUrl: './edit-trip-modal.css'
})
export class EditTripModal {
  private modalState = inject(ModalState);
  private renderer = inject(Renderer2);

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

  trip = input.required<Trip>();

  isModalOpen = computed(() => this.modalState.isEditTripOpen());

  editSubmit = output<Trip>();

  onCancel() {
    this.modalState.setEditTrip(false);
  }

  onEditSubmit() {
    if (!this.checkRequireField()) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      });
      return;
    }

    this.editSubmit.emit(this.trip());
  }

  private checkRequireField() {
    return !!this.trip().name &&
      !!this.trip().detail &&
      !!this.trip().price &&
      !!this.trip().coverimage &&
      !!this.trip().country &&
      !!this.trip().destination_zone &&
      !!this.trip().duration
  }

  constructor() {
    effect(() => {
      if (this.isModalOpen()) {
        this.renderer.addClass(document.body, 'overflow-hidden');
        this.renderer.addClass(document.body, 'pr-[15px]');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
        this.renderer.removeClass(document.body, 'pr-[15px]');
      }
    });
  }
}
