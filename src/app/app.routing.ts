import { Routes, RouterModule } from '@angular/router';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { ConfigurationScreenComponent } from './configuration-screen/configuration-screen.component';
import { HomeKontrolComponent } from './home-kontrol/home.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { KONTROL_ROUTES } from './kontrols-screen/kontrol.routing';


const APP_ROUTES: Routes = [
  { path: '', component: HomeScreenComponent, pathMatch: 'full'},
  { path: 'signin', component: SigninScreenComponent},
  { path: 'configuration', component: ConfigurationScreenComponent},
  { path: 'home', component: HomeKontrolComponent},
  { path: 'kontrols', children: KONTROL_ROUTES}
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
