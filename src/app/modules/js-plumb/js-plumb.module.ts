import { NgModule } from '@angular/core';
import { JsPlumbService } from './js-plumb.service';
import { JsPlumbDraggableDirective } from './directives/js-plumb-draggable.directive';
import { JsPlumbEventService } from './js-plumb-event.service';

@NgModule({
    providers: [
        JsPlumbService,
        JsPlumbEventService
    ],
    declarations: [
        JsPlumbDraggableDirective
    ],
    exports: [
        JsPlumbDraggableDirective
    ],
})
export class JsPlumbModule { }