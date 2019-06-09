import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { JsPlumbService } from '../js-plumb.service';
import { JsPlumbEventService } from '../js-plumb-event.service';

@Directive({
  selector: '[jsplumb-draggable]',
})
export class JsPlumbDraggableDirective {
  elementRef: ElementRef;
  jsPlumbEventService: JsPlumbEventService;

  constructor(elementRef: ElementRef, jsPlumbService: JsPlumbService, jsPlumbEventService: JsPlumbEventService) {
    this.elementRef = elementRef;
    this.jsPlumbEventService = jsPlumbEventService;
    setTimeout(function(){
      jsPlumbService.getInstance().draggable(elementRef.nativeElement.id, {
        grid: [10, 10]
      });
    }, 0);
  }   

  @HostListener('click') onMouseLeave() {
    this.jsPlumbEventService.lauchEvent({
      eventName: "draggable",
      info: this.elementRef
    });
  }
}