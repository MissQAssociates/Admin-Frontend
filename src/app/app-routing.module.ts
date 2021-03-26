import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component'

import { TabBarComponent } from './components/tab-bar/tab-bar.component';

const routes: Routes = [
  // {path: 'dashboard', component: DashboardComponent},
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: TabBarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
