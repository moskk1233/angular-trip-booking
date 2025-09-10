import { Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EditModeService } from '../../../services/edit-mode.service';
import { ModalState } from '../../../services/home/modal-state';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  private editModeService = inject(EditModeService);
  private modalState = inject(ModalState);

  onEditClick() {
    this.editModeService.toggle();
  }

  onNewTripClick() {
    this.modalState.toggleNewModal();
  }

  isShowPanel() {
    return this.router.url === "/";
  }
}
