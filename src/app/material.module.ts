import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSliderModule,
  MatSlideToggleModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
