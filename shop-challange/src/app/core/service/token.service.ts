import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private logged: BehaviorSubject<User> = new BehaviorSubject<User>({ id: 0 });

  constructor() {}

  getInfoObs(): Observable<User> {
    return this.logged.asObservable();
  }

  setInfoObs(user: User) {
    this.logged.next(user);
  }

  takeValue(): User {
    return this.logged.value;
  }

  checkLoggedStatus(): boolean {
    return !!this.logged.value.token;
  }
}
