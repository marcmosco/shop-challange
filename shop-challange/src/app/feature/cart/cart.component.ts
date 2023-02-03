import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { ItemsListService } from '../../core/service/items-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopItem } from '../../shared/model/shopItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public prodList: ShopItem[];
  public count = 0;

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(
    private itemService: ItemsListService,
    private _snackBar: MatSnackBar,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.prodList = res;
    });
  }

  submit(prodList) {
    this.itemService.submitItem(this.prodList).subscribe((observer) => {});
    this.openSnackBar('Ordine 35314a avvenuto con successo');
    this.prodList.length = 0;
  }

  deleteCart() {
    this.cartService.reset();
    this._snackBar.open('Carrello svuotato');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
