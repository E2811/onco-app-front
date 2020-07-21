import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private authSource = new BehaviorSubject<boolean>(false);
  isLogged = this.authSource.asObservable();

  constructor() {}

  changeState(auth: boolean) {
    this.authSource.next(auth);
  }

  getLoggedValue(): boolean {
    return this.authSource.getValue();
  }
}
