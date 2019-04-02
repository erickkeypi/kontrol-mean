import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import 'hammerjs';

import { HomeKontrolComponent } from './home-kontrol/home.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { ConfigurationScreenComponent } from './configuration-screen/configuration-screen.component';
import { KontrolsScreenComponent } from './kontrols-screen/kontrols-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeKontrolComponent,
    SigninScreenComponent,
    ConfigurationScreenComponent,
    KontrolsScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
