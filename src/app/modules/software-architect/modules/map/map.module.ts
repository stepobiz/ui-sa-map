import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsPlumbModule } from '../../../js-plumb/js-plumb.module';

import { SaMapComponent } from './map.component';

@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
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