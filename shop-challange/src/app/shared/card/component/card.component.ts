import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ShopItem } from '../../model/shopItem';
import { CartService } from '../../../core/service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemsListService } from '../../../core/service/items-list.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item: ShopItem;

  constructor(
    private listService: ItemsListService,
    private _snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  addToCart(item: ShopItem) {
    this.cartService.add(item);
  }
}
