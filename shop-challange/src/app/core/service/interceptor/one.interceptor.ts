import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, retry, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OneInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        if (err.status === 401) {
          const message: string = err.headers.get('Errore');
          this.snackBar.open('' + message, 'RIPROVA!');
        }
        return throwError(err);
      })
    );
  }
}
