import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ItemsListService } from '../../../core/service/items-list.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  itemList: any[];
  isLoadingData = false;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsListService: ItemsListService
  ) {
    this.title = this.router.getCurrentNavigation()?.extras.state.title;

    this.getSubscription = this.route.paramMap
      .pipe(
        switchMap((res) => {
          this.isLoadingData = true;
          let category = res.get('category');
          return this.itemsListService.getProductsFromCategory(category!);
        })
      )
      .subscribe((res) => {
        this.isLoadingData = false;
        this.itemList = res;
      });
  }

  ngOnDestroy(): void {
    this.router.onSameUrlNavigation = 'ignore';
  }

  ngOnInit(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
