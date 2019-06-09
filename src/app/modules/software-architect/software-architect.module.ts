import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsPlumbModule } from '../js-plumb/js-plumb.module';

import { MapModule } from './modules/map/map.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MapModule
    ],
    exports: [],
    providers: [],
})
export class SoftwareArchitectModule { }