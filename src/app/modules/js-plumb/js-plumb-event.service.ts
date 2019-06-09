import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class JsPlumbEventService {
  constructor() { }

  private _eventManager = new BehaviorSubject<any>({});
  public eventManager = this._eventManager.asObservable();

  lauchEvent(event: any) {
    this._eventManager.next(event);
  }
}