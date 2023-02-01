import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/comments'
    );
  }

  getFiltered(formValue: any, page: number, pageSize: number): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    let queryParams = new HttpParams();
    if (formValue.postId) {
      queryParams = queryParams.set('postId', formValue.postId);
    }
    if (formValue.name) {
      queryParams = queryParams.set('name_like', formValue.name);
    }
    if (formValue.email) {
      queryParams = queryParams.set('email_like', formValue.email);
    }
    if (formValue.id) {
      queryParams = queryParams.set('id', formValue.id);
    }
    queryParams = queryParams.set('_page', page);
    queryParams = queryParams.set('_limit', pageSize);
    return this.http
      .get<any[]>(url, {
        params: queryParams,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          let result: { data: any[] | null; size: string | null } = {
            data: res.body,
            size: res.headers.get('x-total-count'),
          };

          return result;
        })
      );
  }
}
