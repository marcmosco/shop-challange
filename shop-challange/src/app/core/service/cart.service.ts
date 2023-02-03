import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopItem } from '../../shared/model/shopItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public itemList: ShopItem[] = [];

  public totalList = new BehaviorSubject<ShopItem[]>([]);

  public totalPrice = new BehaviorSubject<number>(0);

  constructor(private _snackBar: MatSnackBar) {}

  add(product: ShopItem) {
    let numero = this.itemList.filter((x) => x.id === product.id);
    if (numero.length === 0) {
      this.itemList.push(product);
      this.totalList.next(this.itemList);
      this._snackBar.open('Aggiunto al carrello', '', { duration: 2000 });
      this.totalPrice.next(this.calculateSum());
    } else {
      this._snackBar.open('Prodotto già aggiunto', '', { duration: 2000 });
    }
  }

  getProducts() {
    return this.totalList.asObservable();
  }

  getSum() {
    return this.totalPrice.asObservable();
  }

  private calculateSum() {
    let sum = 0;
    for (const item of this.itemList) {
      sum = sum + item.price;
    }
    return sum;
  }

  reset() {
    this.itemList = [];
    this.totalList.next(this.itemList);
  }
}
