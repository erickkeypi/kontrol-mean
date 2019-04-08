import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
