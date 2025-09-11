import { AfterViewInit, Component, ElementRef, output, ViewChild} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class Dialog implements AfterViewInit {
  cancelClicked = output();

  @ViewChild('modalBox', { static: true }) modalBox!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    gsap.fromTo(this.modalBox.nativeElement,
      { scale: 0.5 },
      { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
    );
  }

  onCancelClick() {
    this.cancelClicked.emit()
  }
}
