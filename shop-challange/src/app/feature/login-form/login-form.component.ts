import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../../core/service/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() status: boolean;

  handleError: HttpErrorResponse;
  loginForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  hide: boolean = true;
  user: [];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onLogin() {
    this.auth.loginUser(this.email.value, this.password.value).subscribe(
      (data) => {
        this.tokenService.setInfoObs(data);
        this.router.navigateByUrl('/home');
      },
      (err) => {
        const message1: string = err.error.message;
        this.openSnackBar('' + message1, 'close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
