import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsListService } from '../../../core/service/items-list.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { ShopItem } from '../../../shared/model/shopItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  itemList: ShopItem[];
  isLoadingData = false;

  constructor(
    private itemService: ItemsListService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getItemList(1);
  }

  getItemList(page: number) {
    this.isLoadingData = true;
    this.getSubscription = this.itemService.getProducts(page).subscribe(
      (res) => {
        this.itemList = res;
        this.isLoadingData = false;
      },
      (error) => {
        console.log(error);
        this.isLoadingData = false;
      }
    );
  }

  handlePageEvent(e: PageEvent) {
    this.getItemList(e.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
  }
}
