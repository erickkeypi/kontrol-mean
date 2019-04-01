import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
