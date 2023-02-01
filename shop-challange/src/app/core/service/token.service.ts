import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private logged: BehaviorSubject<User> = new BehaviorSubject<User>({ id: 0 });
  data = this.logged.asObservable();

  getInfoObs(): Observable<User> {
    return this.data;
  }

  setInfoObs(user: any) {
    this.logged.next(user);
  }

  takeValue(): User {
    return this.logged.value;
  }
  checkLoggedStatus() {
    return !!this.logged.value.token;
  }

  constructor() {}
}
