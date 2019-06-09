import { Injectable } from '@angular/core';
import { jsPlumb } from 'jsplumb';

@Injectable()
export class JsPlumbService {
  public jsPlumbInstance;

  constructor() {
    this.jsPlumbInstance = jsPlumb.getInstance();
  }

  getInstance(){
    return this.jsPlumbInstance;
  }  
}