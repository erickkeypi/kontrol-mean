import { NgModule } from '@angular/core';

import { MatToolbarModule, MatIconModule } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
