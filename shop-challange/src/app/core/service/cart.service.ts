import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  public itemList: any = [];
  public totalList = new BehaviorSubject<any>([]);

  add(product: any) {
    let numero = this.itemList.filter((x) => x.id === product.id);
    if (numero.length === 0) {
      this.itemList.push(product);
      this.totalList.next(this.itemList);
      this._snackBar.open('Aggiunto al carrello', '', {duration: 2000});
    } else {
      this._snackBar.open('Prodotto già aggiunto','', {duration: 2000});
    }
  }

  getProducts() {
    return this.totalList.asObservable();
  }
  reset() {
    this.itemList = [];
    this.totalList.next(this.itemList);
  }
}
