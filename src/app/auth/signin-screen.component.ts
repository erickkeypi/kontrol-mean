import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';

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

  ngOnInit() {
    this.signinForm =  new FormGroup({
      user: new FormControl(null, Validators.required),
      password:  new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
    }
  }
}
