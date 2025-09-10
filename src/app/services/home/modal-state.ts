import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalState {
  isNewTripOpen = signal(false);
  isEditTripOpen = signal(false);

  toggleNewModal() {
    this.isNewTripOpen.update(v => !v);
  }

  toggleEditModal() {
    this.isEditTripOpen.update(v => !v);
  }

  setNewTrip(value: boolean) {
    this.isNewTripOpen.set(value);
  }

  setEditTrip(value: boolean) {
    this.isEditTripOpen.set(value);
  }
}
