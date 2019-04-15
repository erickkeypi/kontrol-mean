import { KontrolsScreenComponent } from './kontrols-screen.component';
import { SingleKontrolScreenComponent } from '../single-kontrol-screen/single-kontrol-screen.component';
import { KordersScreenComponent } from '../korders-screen/korders-screen.component';
import { KindicatorsScreenComponent } from '../kindicators-screen/kindicators-screen.component';

export const KONTROL_ROUTES = [
  { path: '', component: KontrolsScreenComponent},
  { path: ':id', component: SingleKontrolScreenComponent},
  { path: 'korders/:id', component: KordersScreenComponent},
  { path: 'kindicators/:id', component: KindicatorsScreenComponent}
];
