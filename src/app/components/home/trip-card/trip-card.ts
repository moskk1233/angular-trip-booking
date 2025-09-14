import { Component, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { TruncateWordPipe } from '../../../pipes/truncate-word-pipe';
import { MatIconModule } from '@angular/material/icon';
import { ModalState } from '../../../services/home/modal-state';
import { gsap } from 'gsap';

@Component({
  selector: 'app-trip-card',
  imports: [TruncateWordPipe, MatIconModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit {
  id = input.required<number>();
  name = input.required<string>();
  cover = input.required<string>();
  detail = input.required<string>();
  country = input.required<string>();
  destination = input.required<string>();
  editMode = input.required<boolean>();

  isImageLoading = signal(false);

  onImageLoad() {
    this.isImageLoading.set(false);
  }

  deleteClicked = output<number>();
  editClicked = output<number>();

  @ViewChild('cardBox') cardBox!: ElementRef<HTMLDivElement>;

  onMouseOver() {
    gsap.to(this.cardBox.nativeElement,
      { scale: 1.05, duration: 0.25, ease: 'back' }
    )
  }

  onMouseLeave() {
    gsap.to(this.cardBox.nativeElement,
      { scale: 1, duration: 0.25, ease: 'back' }
    )
  }

  onDeleteClick() {
    this.deleteClicked.emit(this.id());
  }

  onEditClick() {
    this.editClicked.emit(this.id());
  }

  ngOnInit(): void {
    this.isImageLoading.set(true);
  }
}
