import { Component, input } from '@angular/core';
import { TruncateWordPipe } from '../../../pipes/truncate-word-pipe';
import { MatIconModule } from '@angular/material/icon';

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
}
