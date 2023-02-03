import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User } from '../../shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3001/users/authenticate';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  loginUser(email, password): Observable<any> {
    return this.http
      .post<User>(this.url, { email, password }, { observe: 'response' })
      .pipe(
        map((res) => {
          const data: User = res.body;
          data.token = res.headers.get('Authorization');
          this.tokenService.setInfoObs(data);
        })
      );
  }
}
