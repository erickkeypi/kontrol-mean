import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatMenuModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
