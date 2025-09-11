import { Component, inject, input, output } from '@angular/core';
import { TruncateWordPipe } from '../../../pipes/truncate-word-pipe';
import { MatIconModule } from '@angular/material/icon';
import { ModalState } from '../../../services/home/modal-state';

@Component({
  selector: 'app-trip-card',
  imports: [TruncateWordPipe, MatIconModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  id = input.required<number>();
  name = input.required<string>();
  cover = input.required<string>();
  detail = input.required<string>();
  country = input.required<string>();
  destination = input.required<string>();
  editMode = input.required<boolean>();

  deleteClicked = output<number>();
  editClicked = output<number>();

  onDeleteClick() {
    this.deleteClicked.emit(this.id());
  }

  onEditClick() {
    this.editClicked.emit(this.id());
  }
}
