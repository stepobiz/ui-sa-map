import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { JsPlumbService } from '../js-plumb.service';

@Directive({
  selector: '[jsplumb-draggable]',
  
})
export class JsPlumbDraggableDirective {
    constructor(elementRef: ElementRef, jsPlumbService: JsPlumbService) {
        setTimeout(function(){
            jsPlumbService.getInstance().draggable(elementRef.nativeElement.id, {
                grid: [10, 10]
            });
        }, 0);
    }   
}