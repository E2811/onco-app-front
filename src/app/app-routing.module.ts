import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DoctorComponent } from './doctor/doctor.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PatientInformationComponent} from './patient-information/patient-information.component';
import {HomeComponent} from './home/home.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CalendaryComponent } from './calendary/calendary.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'information',
    component: PatientInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
  },{
    path: 'evaluation',
    component: EvaluationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'calendary',
    component: CalendaryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
