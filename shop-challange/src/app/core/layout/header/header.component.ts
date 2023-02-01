import {Component, Input, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenService} from '../../service/token.service';
import {MatSidenav} from '@angular/material/sidenav';
import {CartComponent} from '../../../feature/cart/cart.component';
import {MatDialog} from '@angular/material/dialog';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  name: string;
  storedUser: any;
  decodedToken: any;


  constructor(
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    public carteService: CartService
  ) {}


  ngOnInit(): void {
    this.tokenService.getInfoObs().subscribe((res) => {
      this.storedUser = res;
      this.decodedToken = this.jwtHelper.decodeToken(this.storedUser.token);
    });
    console.log('storedUser:', this.storedUser);
  }


  openCart() {
    const dialogRef = this.dialog.open(CartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
