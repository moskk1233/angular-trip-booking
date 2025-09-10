import { Component, effect, inject, input, output, Renderer2} from '@angular/core';
import { Content } from "./content/content";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-dialog',
  imports: [Content, Footer],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class Dialog {
  renderer = inject(Renderer2);

  isOpen = input.required<boolean>();

  cancelClicked = output();

  onCancelClick() {
    this.cancelClicked.emit();
  }

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.renderer.addClass(document.body, 'pr-[15px]');
        this.renderer.addClass(document.body, 'overflow-hidden');
      }
      else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
        this.renderer.removeClass(document.body, 'pr-[15px]');
      }
    });
  }
}
