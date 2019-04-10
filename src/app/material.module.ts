import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
