import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JsPlumbEventService {
  private eventManager = new BehaviorSubject<any>({});
  private eventObservable;

  constructor() {
    this.eventObservable = this.eventManager.asObservable();
  }

  lauchEvent(event: any) :void {
    this.eventManager.next(event);
  }

  getEventListner() : Observable<any>{
    return this.eventObservable;
  }
}