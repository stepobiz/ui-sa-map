import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsPlumbModule } from '../../../js-plumb/js-plumb.module';

import { SaMapComponent } from './map.component';

@NgModule({
    imports: [ 
        CommonModule,
        JsPlumbModule
     ],
    declarations: [
        SaMapComponent,
    ],
    providers: [],
    exports: [
        SaMapComponent
    ]
})
export class MapModule {}