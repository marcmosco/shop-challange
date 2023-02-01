import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/model/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3001/users/authenticate';

  constructor(private http: HttpClient) {}

  loginUser(email, password): Observable<any> {
    return this.http.post<any>(this.url, { email, password }).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  // getLoggedUser(){
  // const logged = localStorage.getItem('localStorageToken');
  // if (logged){
  //  console.log(logged)
  //  return JSON.parse(logged)
  // }else{
  //   return null
  //   }
  // }
  getFake() {
    return this.http.get<any>('http://localhost:3001/gettest');
  }
}
