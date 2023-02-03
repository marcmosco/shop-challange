import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopItem } from '../../shared/model/shopItem';

@Injectable({
  providedIn: 'root',
})
export class ItemsListService {
  constructor(private http: HttpClient) {}

  getProducts(page: number): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(
      'http://localhost:3002/products?_page=' + page
    );
  }

  submitItem(item: ShopItem[]): Observable<ShopItem> {
    return this.http.post<ShopItem>('http://localhost:3002/itemCart', item);
  }

  getProductsFromCategory(category: string): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(
      'http://localhost:3002/products?category=' + category
    );
  }
}
