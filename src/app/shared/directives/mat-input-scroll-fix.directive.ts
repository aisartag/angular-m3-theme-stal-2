import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: 'input[matInput][type="number"]',
  standalone: true,
})
export class MatInputScrollFixDirective {
  private scrollY: number = 0;
  private readonly input = inject(ElementRef<HTMLInputElement>);

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.input.nativeElement === document.activeElement) {
      event.stopPropagation();
      event.preventDefault();
      if (this.scrollY === 0) {
        this.scrollY = event.deltaY;
        setTimeout(() => {
          window.scrollBy({
            top: this.scrollY,
            behavior: 'smooth',
          });
          this.scrollY = 0;
        }, 50);
      } else {
        this.scrollY += event.deltaY;
      }
    }
  }
}
