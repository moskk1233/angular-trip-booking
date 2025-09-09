import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  isEditMode = signal(false);

  toggle() {
    this.isEditMode.update(v => !v);
  }

  set(value: boolean) {
    this.isEditMode.set(value);
  }
}
