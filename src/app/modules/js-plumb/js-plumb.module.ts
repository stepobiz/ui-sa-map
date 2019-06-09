import { NgModule } from '@angular/core';
import { JsPlumbService } from './js-plumb.service';
import { JsPlumbDraggableDirective } from './directives/js-plumb-draggable.directive';

@NgModule({
    providers: [
        JsPlumbService
    ],
    declarations: [
        JsPlumbDraggableDirective
    ],
    exports: [
        JsPlumbDraggableDirective
    ],
})
export class JsPlumbModule { }