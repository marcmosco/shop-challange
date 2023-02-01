import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from "../../shared/model/category";

@Injectable({
  providedIn: 'root',
})
export class ItemCategoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3001/getVociMenu');
  }
}
