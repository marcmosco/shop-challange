import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from './core/service/token.service';
import { ItemCategoryService } from './core/service/item-category.service';
import { Observable, Subscription } from 'rxjs';
import { User } from './shared/model/user';
import { LoginFormComponent } from './feature/login-form/component/login-form.component';
import { Category } from './shared/model/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'progettoMarco';
  hide = true;
  status: boolean;
  categoryList: Category[];
  getItemSub: Subscription;
  isLoggedIn$: Observable<User>;
  listSub: Subscription;
  constructor(
    private tokenService: TokenService,
    private itemCategory: ItemCategoryService
  ) {}

  ngOnInit(): void {
    console.log(this.status);
    this.check();
    this.itemCat();
    // this.status = this.tokenService.checkLoggedStatus();
  }

  itemCat() {
    this.listSub = this.itemCategory.getAll().subscribe(
      (obs) => {
        this.categoryList = obs;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );
  }
  check() {
    this.isLoggedIn$ = this.tokenService.getInfoObs();
  }
  /* setActivated(ev) {
    if (!(ev instanceof LoginFormComponent)) {
      return;
    }
    const child: LoginFormComponent = ev;
    child.setActiveItem.subscribe(() => {
      this.status = true;
    });
  }*/
}
