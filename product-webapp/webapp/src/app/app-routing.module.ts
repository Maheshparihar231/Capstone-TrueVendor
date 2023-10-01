import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HistoryComponent } from './components/history/history.component';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShowSlotsComponent } from './components/show-slots/show-slots.component';
import { ShowBookingsComponent } from './components/show-bookings/show-bookings.component';
import { SearchComponent } from './components/search/search.component';
import { LoginGuard, RoleGuard, authGuard } from './services/authguard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  {
    path: 'controlpanel', component: ControlpanelComponent, canActivate:[authGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'dashboard', component: DashboardComponent }
    ],
  },
  { path: 'homepage', component: HomepageComponent },
  { path: 'bookings', component: ShowBookingsComponent,canActivate:[LoginGuard]},
  { path: 'slots', component: ShowSlotsComponent, canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent , },
  { path: 'signup', component: SignupComponent ,},
  { path: 'search', component: SearchComponent , canActivate : [authGuard] },
];


export class AppRoutingModule { }


