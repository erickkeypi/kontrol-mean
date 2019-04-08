import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-signin-screen',
  templateUrl: './signin-screen.component.html',
  styles: [`
    p {
      margin-top: 30px;
      font-size: 20px;
    }

    button {
      font-size: 20px;
    }
  `]
})

export class SigninScreenComponent implements OnInit {

  signinForm: FormGroup;

  constructor( private authService: AuthService) {}

  ngOnInit() {
    this.signinForm =  new FormGroup({
      user: new FormControl(null, Validators.required),
      password:  new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const { user, password } = this.signinForm.value;
      const u = new User(user, password);
      this.authService.signin(u)
        .subscribe(
          this.authService.login,
          this.authService.handleError
        );
      // this.authService.login({token: 'tokenuser', userId: 'userid', usuario: user} );
    }
  }
}
