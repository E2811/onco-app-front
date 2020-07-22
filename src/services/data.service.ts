import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private authSource = new BehaviorSubject<boolean>(false);
  isLogged = this.authSource.asObservable();
  private roleSource = new BehaviorSubject<string>(localStorage.getItem('role'));
  role = this.roleSource.asObservable();
  private usernameSource = new BehaviorSubject<string>(localStorage.getItem('username'));
  username = this.usernameSource.asObservable();

  constructor() {}

  changeState(auth: boolean) {
    this.authSource.next(auth);
  }

  getLoggedValue(): boolean {
    return this.authSource.getValue();
  }

  getRoleValue(): string {
    return this.roleSource.value;
  }

  changeRole(auth: string) {
    this.roleSource.next(auth);
  }

  getUsernameValue(): string {
    return this.usernameSource.value;
  }

  changeUsername(auth: string) {
    this.usernameSource.next(auth);
  }
}
