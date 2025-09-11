import { Component, output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class Dialog {
  cancelClicked = output();

  onCancelClick() {
    this.cancelClicked.emit();
  }
}
