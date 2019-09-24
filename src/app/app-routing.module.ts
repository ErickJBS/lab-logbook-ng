import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import {DashboardComponent } from '@components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '',   redirectTo: 'logbook', pathMatch: 'full' },
  /*{ path: '', component: CleanComponent, children:[
    { path: 'login', component: LoginComponent },
  ] },*/
  { path: '', component: MainComponent,  children: [
    { path: 'logbook', component: DashboardComponent },
    // { path: 'logbook', component: DashboardComponent, canActivate : [AuthGuardService] },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
