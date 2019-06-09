import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { JsPlumbService } from '../js-plumb.service';

@Directive({
  selector: '[jsplumb-draggable]',
})
export class JsPlumbDraggableDirective {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef, jsPlumbService: JsPlumbService) {
    this.elementRef = elementRef;
    setTimeout(function(){
      jsPlumbService.getInstance().draggable(elementRef.nativeElement.id, {
        grid: [10, 10]
      });
    }, 0);
  }   

  @HostListener('click') onMouseLeave() {
    console.log("lota", this.elementRef.nativeElement.style.top);
  }
}