import { KontrolsScreenComponent } from './kontrols-screen.component';
import { KordersScreenComponent } from '../korders-screen/korders-screen.component';

export const KONTROL_ROUTES = [
  { path: '', component: KontrolsScreenComponent},
  { path: ':id', component: KordersScreenComponent}
];
